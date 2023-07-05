import client from "@/lib/client";
import { Response } from "@/utils/test-validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getResponses(userId: number): Promise<Response[]> {
    const res = await client.get(`/api/responses?userId=${userId}`);
    return res.data;
}

function useResponses(userId: number) {
    const queryClient = useQueryClient();
    return useQuery({
        queryFn: () => getResponses(userId),
        queryKey: ["responses"],
        onSuccess: () => {
            queryClient.invalidateQueries(["responses"]);
        }

    })
}

export default useResponses;