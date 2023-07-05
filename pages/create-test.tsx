import TestForm from "@/features/tests/components/TestForm/TestForm";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";

function CreateTest() {
    return (
        <WithPrivate>
            <TestForm />
        </WithPrivate>
    );
}
export default CreateTest;
