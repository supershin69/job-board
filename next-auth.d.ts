import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "job_seeker" | "employer" | "admin";
  }

  interface AdapterUser {
    role?: "job_seeker" | "employer" | "admin";
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role?: "job_seeker" | "employer" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "job_seeker" | "employer" | "admin";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "job_seeker" | "employer" | "admin";
  }
}