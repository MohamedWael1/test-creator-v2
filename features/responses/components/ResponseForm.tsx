import useTest from "@/features/tests/hooks/useTest";
import Button from "@/features/ui/Button/Button";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useCreateTestResponse from "../hooks/useCreateResponse";
import { useAuth } from "@/features/users/components/AuthProvider";

function ResponseForm() {
    const router = useRouter();
    const { user } = useAuth();
    const id = router.query.id;
    const { data: test } = useTest(Number(id));
    const [testResponse, setTestResponse] = useState({
        testId: Number(id),
        studentId: user?.id,
        userId: test?.userId,
        result: 0 ,
        studentEmail: user?.email,
        responseQuestion: test?.questions?.map((question) => {
            return {
                questionId: question.id,
                questionPoints: question.questionPoints,
                question: question.question,
                areMultipleAnswersAllowed: question.areMultipleAnswersAllowed,
                responseAnswer: question.answers.map((answer) => {
                    return {
                        answerId: answer.id,
                        answer: answer.answer,
                        isChosen: false,
                    };
                }),
            };
        }),
    });
    console.log(testResponse.responseQuestion);
    const { mutate, isLoading: isSubmitting } = useCreateTestResponse();
    const handleResponseAnswerChange = (
        answerId: number,
        questionId: number
    ) => {
        const response = testResponse.responseQuestion?.map((question) => {
            if (question.questionId !== questionId) {
                return question;
            }

            return {
                ...question,
                responseAnswer: question.responseAnswer.map((answer) => {
                    if (answer.answerId === answerId) {
                        return {
                            ...answer,
                            isChosen: !answer.isChosen,
                        };
                    }
                    return {
                        ...answer,
                        isChosen: question.areMultipleAnswersAllowed
                            ? answer.isChosen
                            : false,
                    };
                }),
            };
        });
        setTestResponse({
            ...testResponse,
            responseQuestion: response,
        });
    };
    return (
        <div>
            <div className="flex justify-center items-center py-10 flex-col md:flex-row">
                <label className=" text-primary font-semibold text-2xl">
                    {test?.testName}
                </label>
            </div>

            {testResponse.responseQuestion?.map((question, index) => (
                <div key={question.questionId}>
                    <div className="flex-grow">
                        <label className="text-primary font-semibold text-xl">
                            {index + 1}. {question.question}
                        </label>
                    </div>
                    <div className="py-4">
                        <div>
                            {question.responseAnswer.map((answer, index) => {
                                return (
                                    <div
                                        className="flex items-center pl-2 "
                                        key={answer.answerId}
                                    >
                                        <input
                                            id={String(answer.answerId)}
                                            type={
                                                question.areMultipleAnswersAllowed
                                                    ? "checkbox"
                                                    : "radio"
                                            }
                                            className="mr-2"
                                            value={answer.answer}
                                            checked={answer.isChosen}
                                            onChange={() => {
                                                handleResponseAnswerChange(
                                                    answer.answerId as number,
                                                    question.questionId as number
                                                );
                                            }}
                                        />
                                        <label
                                            className="text-primary font-semibold text-xl"
                                            htmlFor={String(answer.answerId)}
                                        >
                                            {answer.answer}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center py-6">
                <Button
                    onClick={() => {
                        // @ts-ignore
                        mutate(testResponse, {
                            onSuccess: () => {
                                router.push("/dashboard/tests");
                            },
                        });
                    }}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default ResponseForm;
