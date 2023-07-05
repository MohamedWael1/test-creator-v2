import prisma from "@/lib/prisma";

async function deleteTest(id: number) {
    const questions = await prisma.question.deleteMany({
        where: {
            testId: id
        }
    });

    const answers = await prisma.answer.deleteMany({
        where: {
            question: {
                testId: id
            }
        }
    });


    const test = await prisma.test.delete({
        where: {
            id: id
        }
    });



}

export default deleteTest;