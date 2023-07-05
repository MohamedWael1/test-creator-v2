import ResponseForm from "@/features/responses/components/ResponseForm";
import TestForm from "@/features/tests/components/TestForm/TestForm";
import useTest from "@/features/tests/hooks/useTest";
import { Test } from "@/features/tests/types";
import Spinner from "@/features/ui/Spinner/Spinner";
import { useAuth } from "@/features/users/components/AuthProvider";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";
import Image from "next/image";
import { useRouter } from "next/router";

function TestPage(props: Test) {
    const { user } = useAuth();
    const router = useRouter();
    const id = router.query.id;
    const { data: test, isLoading } = useTest(Number(id));

    return (
        <WithPrivate>
            <div className="max-w-4xl mx-auto px-2">
                {isLoading ? (
                    <Spinner size="lg" />
                ) : test ? (
                    test.userId === user?.id ? (
                        <TestForm {...test} />
                    ) : (
                        <ResponseForm />
                    )
                ) : (
                    <div className="flex justify-center">
                        <Image
                            src="/images/page-not-found.svg"
                            width={600}
                            height={600}
                            alt="page not found"
                        />
                    </div>
                )}
            </div>
        </WithPrivate>
    );
}

export default TestPage;
