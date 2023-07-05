import { Test } from "../tests/types";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../ui/Spinner/Spinner";
import useDeleteTest from "../tests/hooks/useDeleteTest";

interface TestCardProps extends Test {
    onClick: () => void;
}

function TestCard(props: TestCardProps) {
    const { mutate, isLoading: isDeleting } = useDeleteTest();

    const numberOfQuestionsInTest = (): number => {
        return props.questions?.length as number;
    };
    return (
        <div
            onClick={props.onClick}
            className="min-h-[180px] capitalize cursor-pointer text-gray-600  border font-semibold max-w-sm bg-white opacity-90 hover:opacity-100 shadow-md rounded-md hover:shadow-indigo-200 transition-all relative p-4"
        >
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div>test name: {props.testName}</div>

                    <div>questions: {numberOfQuestionsInTest()}</div>
                </div>
                <div>
                    {" "}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            mutate(props.id as number);
                        }}
                        className="relative  z-10 "
                    >
                        {isDeleting ? (
                            <Spinner size="sm" />
                        ) : (
                            <AiFillDelete className="text-xl " />
                        )}
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 right-4">
                <div>total points: {props.totalTestPoints}</div>
            </div>
        </div>
    );
}

export default TestCard;
