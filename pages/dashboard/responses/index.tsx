import useResponses from "@/features/responses/hooks/useResponses";
import Spinner from "@/features/ui/Spinner";
import { useAuth } from "@/features/users/components/AuthProvider";
import { Response } from "@/utils/test-validations";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/ui/Table";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";
import Layout from "@/features/Layout";

function Responses() {
    const { user } = useAuth();
    const { data: responses, isLoading } = useResponses(user?.id as number);
    return (
        <WithPrivate>
            <Layout>
                {isLoading ? (
                    <Spinner size="lg" />
                ) : (
                    <div className="max-w-2xl my-10 mx-auto ">
                        <Table className="text-primary-text ">
                            <TableCaption className="font-bold">
                                Responses
                            </TableCaption>
                            <TableHeader className="font-bold">
                                <TableRow>
                                    <TableHead>Test ID</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Student Email</TableHead>
                                    <TableHead>Result</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="font-semibold">
                                {responses?.map((res,index) => (
                                    <TableRow key={index}>
                                        <TableCell>{res.testId}</TableCell>
                                        <TableCell>{res.studentId}</TableCell>
                                        <TableCell>
                                            {res.studentEmail}
                                        </TableCell>
                                        <TableCell>
                                            {res.result}/
                                            {res.responseQuestion
                                                .map((q) => q.questionPoints)
                                                .reduce((a, b) => a + b, 0)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Layout>
        </WithPrivate>
    );
}

export default Responses;
