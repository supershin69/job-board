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

            const isOnAdminPath = nextUrl.pathname.startsWith("/dashboard/admin");
            const isOnEmployerPath = nextUrl.pathname.startsWith("/dashboard/employer");
            const isOnSeekerPath = nextUrl.pathname.startsWith("/dashboard/seeker");
            const isDashboardPath = nextUrl.pathname === "/dashboard";
            const isOnAuthPage = nextUrl.pathname === '/login' || nextUrl.pathname === '/register';

            if (!isLoggedIn && (isOnAdminPath || isOnEmployerPath || isOnSeekerPath) && !isOnAuthPage) {
                return false;
            }

            if (isDashboardPath) {
                if (role === 'admin') {
                    return Response.redirect(new URL('/dashboard/admin', nextUrl));
                }
                if (role === "employer") {
                    return Response.redirect(new URL('/dashboard/employer', nextUrl));
                }
                return Response.redirect(new URL('/dashboard/seeker', nextUrl));
            }

            if (isOnAdminPath && role !== 'admin') {
                return Response.redirect(new URL('/login', nextUrl));
            }

            if (isOnEmployerPath && role !== 'employer') {
                return Response.redirect(new URL('/dashboard/seeker', nextUrl));
            }

            if (isOnSeekerPath && role !== 'job_seeker') {
                return Response.redirect(new URL('/dashboard/employer', nextUrl))
            }

            if (isOnAuthPage && isLoggedIn) {
                if (role === 'admin') {
                    return Response.redirect(new URL('/dashboard/admin', nextUrl));
                } else if (role === 'employer') {
                    return Response.redirect(new URL('/dashboard/employer', nextUrl));
                } else if (role === 'job_seeker') {
                    return Response.redirect(new URL('/dashboard/seeker', nextUrl));
                }
            }

            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;