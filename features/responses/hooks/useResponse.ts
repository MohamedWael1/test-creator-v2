import client from "@/lib/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function getResponse(id: number) {
    const res = await client.get(`/api/responses/${id}`);
    return res.data;
}

function useResponse(id: number) {
    const queryClient = useQueryClient();
    return useQuery({
        queryFn: () => getResponse(id),
        queryKey: ["responses", id],
        onSuccess: () => {
            queryClient.invalidateQueries(["responses"]);
        }

    })
}

export default useResponse;