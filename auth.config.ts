import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/login",
        signOut: "/logout",
        newUser: "/register",
    },
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.role = user.role;
            } 
            return token;
        },

        async session({ session, token}) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
        
        authorized({ auth, request: { nextUrl}}) {
            const user = auth?.user;
            const isLoggedIn = !!user;
            const role = user?.role;

            const isOnAdminPath = nextUrl.pathname.startsWith("/admin");
            const isOnEmployerPath = nextUrl.pathname.startsWith("/employer");
            const isOnSeekerPath = nextUrl.pathname.startsWith("/seeker");
            const isOnAuthPage = nextUrl.pathname === '/login' || nextUrl.pathname === '/register';

            if (!isLoggedIn && (isOnAdminPath || isOnEmployerPath || isOnSeekerPath) && !isOnAuthPage) {
                return false;
            }

            if (isOnAdminPath && role !== 'admin') {
                return Response.redirect(new URL('/login', nextUrl));
            }

            if (isOnEmployerPath && role !== 'employer') {
                return Response.redirect(new URL('/seeker/dashboard', nextUrl));
            }

            if (isOnSeekerPath && role !== 'job_seeker') {
                return Response.redirect(new URL('/employer/dashboard', nextUrl))
            }

            if (isOnAuthPage && isLoggedIn) {
                if (role === 'admin') {
                    return Response.redirect(new URL('/admin/dashboard', nextUrl));
                } else if (role === 'employer') {
                    return Response.redirect(new URL('/employer/dashboard', nextUrl));
                } else if (role === 'job_seeker') {
                    return Response.redirect(new URL('/seeker/dashboard', nextUrl));
                }
            }

            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;