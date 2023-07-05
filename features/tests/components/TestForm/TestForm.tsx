import Button from "@/features/ui/Button/Button";
import { useReducer } from "react";
import Input from "@/features/ui/Input/Input";
import reducer from "./TestForm.helpers";
import QuestionForm from "../Questions/QuestionForm";
import { Test } from "../../types";
import useCreateTest from "../../hooks/useCreateTest";
import { useRouter } from "next/router";
import useUpdateTest from "../../hooks/useUpdateTest";
import Layout from "@/features/Layout";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";

function TestForm(props: Test) {
    const isNew = !props.id;
    const router = useRouter();

    const [test, dispatch] = useReducer(
        reducer,
        isNew
            ? {
                  testName: "",
                  questions: [],
                  totalTestPoints: 0,
              }
            : {
                  ...props,
              }
    );

    console.log(test);

    const calculateTotalPoints = () => {
        let totalPoints = 0;
        test.questions?.forEach((question) => {
            totalPoints += question.questionPoints;
        });
        return totalPoints;
    };

    test.totalTestPoints = calculateTotalPoints();

    const { isLoading: isCreating, mutate: createTest } = useCreateTest();
    const { isLoading: isUpdating, mutate: updateTest } = useUpdateTest(
        test?.id as number
    );

    return (
        <WithPrivate>
            <Layout>
                <div className="flex justify-center items-center py-10 flex-col md:flex-row">
                    <Input
                        placeholder="Test Title"
                        aria-label="Test Title"
                        value={test.testName}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            dispatch({
                                type: "handle_test_name_change",
                                payload: target.value,
                            });
                        }}
                    />
                    <div className="flex flex-col items-center">
                        <div className="px-10 font-semibold">
                            Total Points: {test.totalTestPoints}{" "}
                        </div>
                    </div>
                </div>

                {test.questions?.map((question, index) => (
                    <div key={question.id}>
                        {index + 1}.
                        <QuestionForm
                            isMoveQuestionDownArrowHidden={
                                index === test.questions?.length as number - 1
                            }
                            isMoveQuestionUpArrowHidden={index === 0}
                            id={question.id}
                            questionPoints={question.questionPoints}
                            answers={question.answers}
                            areMultipleAnswersAllowed={
                                question.areMultipleAnswersAllowed
                            }
                            question={question.question}
                            onChange={(newQuestion) => {
                                dispatch({
                                    type: "handle_question_fields_change",
                                    payload: {
                                        answers: newQuestion.answers,
                                        question: newQuestion.question,
                                        questionPoints:
                                            newQuestion.questionPoints,
                                        areMultipleAnswersAllowed:
                                            newQuestion.areMultipleAnswersAllowed,
                                        questionIndex: index,
                                    },
                                });
                            }}
                            onDelete={() => {
                                dispatch({
                                    type: "delete_question",
                                    payload: index,
                                });
                            }}
                            onSortChange={(indexIncrement) => {
                                dispatch({
                                    type: "handle_sort_change",
                                    payload: {
                                        questionId: question.id,
                                        indexIncrement: indexIncrement,
                                    },
                                });
                            }}
                        />
                    </div>
                ))}

                <div className="flex  justify-end py-10">
                    <Button onClick={() => dispatch({ type: "add_question" })}>
                        Add Question
                    </Button>
                </div>

                <div className="flex justify-center py-6">
                    <Button
                        isLoading={isCreating || isUpdating}
                        onClick={() => {
                            isNew
                                ? createTest(test, {
                                      onSuccess: () => {
                                          router.push(`/dashboard/tests`);
                                      },
                                  })
                                : updateTest(test, {
                                      onSuccess: () => {
                                          router.push(`/dashboard/tests`);
                                      },
                                  });
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Layout>
        </WithPrivate>
    );
}

export default TestForm;
