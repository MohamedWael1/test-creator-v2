import prisma from "@/lib/prisma"
import { Question, Test, TestParser } from "@/utils/test-validations";


export async function createTest(data: Test) {
    const testData = TestParser.parse(data);

    const test = await prisma.test.create({
        data: {
            ...testData,
            questions: {
                create: testData.questions.map((q: Question) => {
                    return {
                        ...q,
                        answers: {
                            create: q.answers
                        }
                    }
                })
            }

        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    });

    return test

}