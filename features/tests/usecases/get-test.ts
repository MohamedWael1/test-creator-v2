import protect from "@/lib/middleware/protect";
import prisma from "@/lib/prisma";



async function getTest(id: number, userId: number) {
    const test = await prisma.test.findUnique({
        where: {
            id: id,
        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    })
    if (test?.userId !== userId) {
        test?.questions.forEach(question => {
            question.answers.forEach(answer => {
                // @ts-ignore
                delete answer?.isCorrect
            })
        })
    }
    return test
}

export default getTest;