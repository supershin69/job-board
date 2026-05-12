'use server';

import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import z from "zod";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["job_seeker", "employer"])
});

export async function registerUser(formData: FormData) {
    const validatedData = registerSchema.safeParse({
        ...Object.fromEntries(formData.entries())
    });

    if (!validatedData.success) {
        console.log("Validation errors:", validatedData.error.format());
        return;
    }

    const { name, email, password, role } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        console.log("User with this email already exists");
        return;
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                profile: {
                    create: {}
                }
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
    }

    redirect("/login");
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return redirect('/login?error=CredentialsSignin');
    }

    await signIn('credentials', {
      email,
      password: formData.get('password'),
      redirect: false,
    });

    if (user.role === 'admin') redirect('/dashboard/admin');
    if (user.role === 'employer') redirect('/dashboard/employer');
    if (user.role === 'job_seeker') redirect('/dashboard/seeker');

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/login?error=CredentialsSignin');
    }
    throw error;
  }
}