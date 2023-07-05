export interface Test {
    testName?: string;
    totalTestPoints?: number;
    questions?: Question[];
    id?: number;
    userId?: number;
}

export interface Question {
    question: string;
    questionPoints: number;
    areMultipleAnswersAllowed: boolean;
    answers: Answer[];
    id: number;
}


export interface Answer {
    answer: string;
    isCorrect: boolean;
    id?: number;
}