import TestCard from "@/features/dashboard/TestCard";
import useTests from "@/features/tests/hooks/useTests";
import Button from "@/features/ui/Button/Button";
import { useAuth } from "@/features/users/components/AuthProvider";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { VscAdd } from "react-icons/vsc";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";
import Layout from "@/features/Layout";

function Dashboard() {
    const { user } = useAuth();
    const { data: tests } = useTests(user?.id as number);
    const router = useRouter();
    return (
        <Layout>
            <WithPrivate>
                <div
                    className="max-w-6xl gap-2 mx-auto p-4 "
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                    }}
                >
                    {tests?.map((test) => (
                        <motion.div
                            key={test.id}
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: "spring",
                            }}
                        >
                            <TestCard
                                totalTestPoints={test.totalTestPoints}
                                testName={test.testName}
                                questions={test.questions}
                                id={test.id}
                                onClick={() =>
                                    router.push(`/dashboard/tests/${test.id}`)
                                }
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="fixed bottom-4 right-4"
                    whileHover={{ scale: 1.1 }}
                >
                    <Button
                        className="min-w-[50px] flex items-center justify-center"
                        onClick={() => router.push("/create-test")}
                    >
                        <VscAdd />
                    </Button>
                </motion.div>
            </WithPrivate>
        </Layout>
    );
}

export default Dashboard;
