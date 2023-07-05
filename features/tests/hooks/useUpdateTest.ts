import client from "@/lib/client";
import { Test } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateTest(id: number, data: Test) {
    const res = await client.put(`/api/tests/${id}`, data)
    return res.data
}


function useUpdateTest(id: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Test) => updateTest(id, data),
        mutationKey: ['tests', id],
        onSuccess: () => {
            queryClient.invalidateQueries(['tests'])
        }

    })
}

export default useUpdateTest;
