import { boolean, z } from "zod"

export const AnswersParserTestParser = z.object({
    isCorrect: z.boolean(),
    answer: z.string()
})

export const QuestionParserTestParser = z.object({
    question: z.string(),
    areMultipleAnswersAllowed: z.boolean(),
    questionPoints: z.number(),
    answers: AnswersParserTestParser.array()
})

export const TestParser = z.object({
    testName: z.string(),
    userId: z.number(),
    totalTestPoints: z.number(),
    questions: QuestionParserTestParser.array()
})

export const responseQuestionParser = z.object({
    questionPoints: z.number(),
    questionId: z.number(),
    question: z.string(),
    responseAnswer: z.array(z.object({
        answerId: z.number(),
        answer: z.string(),
        isChosen: boolean()
    }))
})

export const ResponseParser = z.object({
    testId: z.number(),
    userId: z.number(),
    studentId: z.number(),
    studentEmail: z.string(),
    result: z.number(),
    responseQuestion: z.array(responseQuestionParser)
})



export type Test = z.infer<typeof TestParser>
export type Question = z.infer<typeof QuestionParserTestParser>
export type Answer = z.infer<typeof AnswersParserTestParser>
export type Response = z.infer<typeof ResponseParser>
export type ResponseQuestion = z.infer<typeof responseQuestionParser>