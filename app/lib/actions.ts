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
                role
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
    }

    redirect("/login");
}

export async function loginUser(formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    console.log("Invalid email or password");
                    break;
                default:
                    console.error("An unexpected error occurred. Please try again.");
                    break;
            }
        }

        throw error;
    }
}