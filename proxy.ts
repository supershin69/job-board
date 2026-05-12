import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // Matches all paths except api, static files, and specific image extensions
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};