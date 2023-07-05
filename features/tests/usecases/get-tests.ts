import prisma from "@/lib/prisma";

export async function getTests(userId: number) {
    const tests = await prisma.test.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    })
    return tests;
}

export default getTests;