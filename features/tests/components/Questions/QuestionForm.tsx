import Button from "@/features/ui/Button";
import { motion } from "framer-motion";
import Toggler from "@/features/ui/Toggler/Toggler";
import { MdArrowUpward, MdArrowDownward, MdOutlineClose } from "react-icons/md";
import { Answer, Question } from "../../types";
import questionReducer, { QuestionActions } from "./QuestionForm.helpers";
import clsx from "clsx";
import Input from "@/features/ui/Input/Input";

interface QuestionProps extends Question {
    onChange: (newQuestion: Question) => void;
    onDelete: () => void;
    onSortChange: (indexIncrement: number) => void;
    isMoveQuestionUpArrowHidden: boolean;
    isMoveQuestionDownArrowHidden: boolean;
}

interface AnswerProps extends Answer {
    onChange: (e: any) => void;
}

function QuestionForm(props: QuestionProps) {
    const handleChange = (action: QuestionActions) => {
        const newQuestion = questionReducer(props, action);
        props.onChange(newQuestion);
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "tween",
                delay: 0.2,
            }}
        >
            <div className="flex justify-end">
                <div>
                    <MdOutlineClose
                        className={clsx(`text-2xl cursor-pointer mr-2`)}
                        onClick={props.onDelete}
                    />
                </div>
                <div onClick={() => props.onSortChange(1)}>
                    <MdArrowDownward
                        className={clsx(
                            props.isMoveQuestionDownArrowHidden
                                ? "hidden"
                                : "block",
                            "text-2xl mr-4 cursor-pointer"
                        )}
                    />
                </div>
                <div onClick={() => props.onSortChange(-1)}>
                    <MdArrowUpward
                        className={clsx(
                            props.isMoveQuestionUpArrowHidden
                                ? "hidden"
                                : "block",
                            "text-2xl cursor-pointer"
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex-grow">
                    <Input
                        placeholder="Question"
                        aria-label="Question"
                        className="min-w-[300px] md:min-w-[400px] w-full "
                        value={props.question}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            handleChange({
                                type: "handle_question_change",
                                payload: target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="py-4">
                <div>
                    {props.answers.map((answer, index) => {
                        return (
                            <div className="flex items-center " key={index}>
                                <input
                                    type={
                                        props.areMultipleAnswersAllowed
                                            ? "checkbox"
                                            : "radio"
                                    }
                                    className="mr-2"
                                    value={answer.answer}
                                    checked={answer.isCorrect}
                                    onChange={() =>
                                        handleChange({
                                            type: "set_correct_answer",
                                            payload: index,
                                        })
                                    }
                                />
                                <AnswerForm
                                    answer={answer.answer}
                                    isCorrect={answer.isCorrect}
                                    onChange={(e) => {
                                        const target =
                                            e.target as HTMLInputElement;
                                        handleChange({
                                            type: "handle_answer_change",
                                            payload: {
                                                answerIndex: index,
                                                answer: target.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            handleChange({
                                type: "handle_add_answer",
                            });
                        }}
                    >
                        Add Option
                    </Button>
                </div>
            </div>

            <hr className="mt-4" />

            <div className="flex flex-col md:flex-row justify-between py-8">
                <div>
                    <Input
                        value={props.questionPoints.toString()}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            handleChange({
                                type: "handle_question_points_change",
                                payload: Number(target.value),
                            });
                        }}
                    />
                </div>

                <div className="flex flex-col md:flex-row p-4 font-semibold">
                    <div className="flex">
                        <Toggler
                            isActive={props.areMultipleAnswersAllowed}
                            onToggle={() => {
                                handleChange({
                                    type: "handle_question_multiple_answers_change",
                                    payload: !props.areMultipleAnswersAllowed,
                                });
                            }}
                        />{" "}
                        <div className="mx-2">Multiple Answers</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function AnswerForm(props: AnswerProps) {
    return (
        <motion.div
            className="flex items-center mb-4 max-w-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "tween",
            }}
        >
            <Input
                value={props.answer}
                type="text"
                placeholder="Answer"
                aria-label="Answer"
                className=" min-w-[250px] md:min-w-[400px] w-full "
                onChange={props.onChange}
            />
        </motion.div>
    );
}

export default QuestionForm;
