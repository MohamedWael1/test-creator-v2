import { Question, Test } from "../../types";

type TestActions = {
    type: "add_question",
} | {
    type: "delete_question",
    payload: number;
} | {
    type: "show_answers"
} | {
    type: "randomize_questions"
} | {
    type: "handle_test_name_change",
    payload: string;
} | {
    type: "handle_sort_change",
    payload: {
        questionId: number;
        indexIncrement: number,
    }
} | {
    type: "handle_question_fields_change",
    payload: {
        questionIndex: number,
        question: string,
        answers: {
            answer: string,
            isCorrect: boolean,
        }[],
        areMultipleAnswersAllowed: boolean,
        questionPoints: number
    }
} | {
    type: "handle_time_limit_change",
    payload: number
}


const swap = (arr: Question[], index1: number, index2: number) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function reducer(state: Test, action: TestActions): Test {
    switch (action.type) {
        case "add_question": {
            const questions = state.questions as Question[];
            return {
                ...state,
                questions: [
                    ...questions,
                    {
                        id: questions.length + 1,
                        question: "",
                        answers: [
                            {
                                answer: "",
                                isCorrect: false,
                                
                            },
                            {
                                answer: "",
                                isCorrect: false,
                            },
                        ],
                        areMultipleAnswersAllowed: false,
                        questionPoints: 0,
                    }
                ]
            }
        }

        case "delete_question": {
            const questions = state.questions;
            return {
                ...state, questions: questions?.filter((question, i) => i !== action.payload) 
            }

        }


    
      

        case "handle_test_name_change": {
            return {
                ...state,
                testName: action.payload
            }
        }

        case "handle_question_fields_change": {
            const questions = state.questions;
            return {
                ...state,
                questions: questions?.map((question, i) => {
                    if (i === action.payload.questionIndex) {
                        return {
                            ...question,
                            question: action.payload.question,
                            answers: action.payload.answers,
                            areMultipleAnswersAllowed: action.payload.areMultipleAnswersAllowed,
                            questionPoints: action.payload.questionPoints
                        }
                    }
                    return question;
                })
            }
        }

        case "handle_sort_change": {
            const questions = [...state.questions as Question[]] ;
            const questionIndex = questions.findIndex(q => q.id === action.payload.questionId);
            swap(questions, questionIndex, questionIndex + action.payload.indexIncrement);

            return {
                ...state,
                questions
            }

        }

      

        default:
            return state;
    }

}

export default reducer;