import { prisma } from "./prisma";

export async function fetchCompanies() {
    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true
        }
    });

    return companies;
}



