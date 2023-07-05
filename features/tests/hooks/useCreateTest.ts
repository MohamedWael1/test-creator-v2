import client from "@/lib/client";
import { Test } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createTest(data: Test) {
    const res = await client.post("/api/tests", data)
    return res.data
}

function useCreateTest() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Test) => createTest(data),
        mutationKey: ["test"],
        onSuccess: () => {
           return queryClient.invalidateQueries(["test"])
        }
    })
}

export default useCreateTest;