import { Question } from "../../types";

export type QuestionActions = {
    type: "handle_question_change";
    payload: string;
} | {
    type: "handle_question_points_change";
    payload: number;
} | {
    type: "handle_question_multiple_answers_change";
    payload: boolean;
} | {
    type: "handle_add_answer";
} | {
    type: "handle_answer_change";
    payload: {
        answer: string;
        answerIndex: number;
    };
} | {
    type: "set_correct_answer";
    payload: number
}

function questionReducer(state: Question, action: QuestionActions) {
    switch (action.type) {
        case "handle_question_change":
            return {
                ...state,
                question: action.payload
            };
        case "handle_question_points_change":
            return {
                ...state,
                questionPoints: action.payload
            };
       
        case "handle_question_multiple_answers_change":
            return {
                ...state,
                areMultipleAnswersAllowed: action.payload
            };

        case "handle_add_answer":
            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        answer: "",
                        isCorrect: false,
                    }
                ]
            };

        case "handle_answer_change":
            return {
                ...state,
                answers: state.answers.map((answer, index) => {
                    if (index === action.payload.answerIndex) {
                        return {
                            ...answer,
                            answer: action.payload.answer
                        };
                    }
                    return answer;
                })
            }

        case "set_correct_answer": {
            const answers = state.answers;
            return {
                ...state,
                answers: answers.map((answer, i) => {
                    if (i === action.payload) {
                        return {
                            ...answer,
                            isCorrect: !answer.isCorrect
                        }
                    }
                    return {
                        ...answer,
                        isCorrect: state.areMultipleAnswersAllowed ? answer.isCorrect : false
                    }
                })
            }

        }
        default:
            return state;
    }
}

export default questionReducer;