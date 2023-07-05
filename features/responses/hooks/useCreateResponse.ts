import client from "@/lib/client";
import { Response } from "@/utils/test-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createTestResponse(data: Response) {
    const res = await client.post("/api/responses", data);
    return res.data;
}

function useCreateTestResponse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Response) => createTestResponse(data),
        mutationKey: ["responses"],
        onSuccess: () => {
            queryClient.invalidateQueries(["responses"]);
        }

    })
}

export default useCreateTestResponse;