import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import * as bcrypt from "bcryptjs"

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
/*     await prisma.company.createMany({
        data: [
            {
                name: "NeoTech",
                slug: "neotech"
            },
            {
                name: "PopySolutions",
                slug: "popy-solutions"
            },
            {
                name: "Chou Bayin",
                slug: "cbayin"
            }
        ]
    }); */
    await prisma.user.create({
        data: {
            name: "Kaung Myat",
            email: "kaungmyat123@gmail.com",
            password: await bcrypt.hash("jokerneedGF1!", 10),
            role: "admin",
            email_verified: true
        }
    })
}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })