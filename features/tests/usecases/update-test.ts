import prisma from "@/lib/prisma";
import { Test, TestParser } from "@/utils/test-validations";



async function updateTest(id: number, data: Test) {
    const test = TestParser.parse(data);
    const updatedTest = await prisma.test.update({
        where: { id: id },
        data: {
            ...test,
            questions: {
                deleteMany: {},
                create: test.questions.map((question) => ({
                    ...question,
                    answers: {
                        create: question.answers.map((answer) => ({
                            ...answer
                        }))
                    }
                }))
            }

        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    })
    return updatedTest;
}

export default updateTest;
