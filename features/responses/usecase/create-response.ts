import useTest from "@/features/tests/hooks/useTest";
import { Question } from "@/features/tests/types";
import prisma from "@/lib/prisma";
import { Response, ResponseParser, ResponseQuestion } from "@/utils/test-validations";


const getTestQuestions = async (testId: number) => {
    const test = await prisma.test.findUnique({
        where: {
            id: testId
        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    })

    return test?.questions
}


const compareQuestionAndResponseAnswers = (responseQuestion: ResponseQuestion, question: Question): boolean => {
    const chosenAnswers = responseQuestion.responseAnswer.filter(resAnswer => resAnswer.isChosen);
    const correctAnswers = question.answers.filter(ans => ans.isCorrect)
    if (chosenAnswers.length !== correctAnswers.length) {
        return false
    }
    const chosenAnswersIds = chosenAnswers.map(ans => ans.answerId)
    const correctAnswersIds = correctAnswers.map(ans => ans.id)
    const isCorrect = chosenAnswersIds.every(ans => correctAnswersIds.includes(ans))
    return isCorrect
}



const correctResponse = async (response: Response, testId: number) => {
    const questions = await getTestQuestions(testId)
    let result = 0;
    response.responseQuestion.forEach(resQuestion => {
        const question = questions?.find(q => q.id === resQuestion.questionId)
        if (question) {
            if (compareQuestionAndResponseAnswers(resQuestion, question)) {
                result += resQuestion.questionPoints
            }
        }
    })

    return result
}


export const createResponse = async (response: Response) => {
    const responseData = ResponseParser.parse(response);
    const newResponse = await prisma.testResponse.create({
        data: {
            ...responseData,
            result: await correctResponse(responseData, responseData.testId),
            responseQuestion: {
                create: responseData.responseQuestion.map((q) => {
                    return {
                        ...q,
                        responseAnswer: {
                            create: q.responseAnswer
                        }
                    }
                }
                )
            }
        }
    })
    return newResponse;
}