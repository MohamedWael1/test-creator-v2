import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteTest(id: number) {
    const res = await client.delete(`/api/tests/${id}`)
    return res.data
}

function useDeleteTest() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTest,
        mutationKey: ["tests"],
        onSuccess: () => {
           return queryClient.invalidateQueries(["tests"])
        }

    }

    )


}

export default useDeleteTest;