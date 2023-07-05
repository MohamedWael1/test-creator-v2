import client from "@/lib/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Test } from "../types";


async function getTest(id: number) {
    const res = await client.get(`/api/tests/${id}`)
    return res.data
}

function useTest(id: number) {
    return useQuery({
        queryFn: (): Promise<Test> => getTest(id),
        queryKey: ["tests", id],
        enabled: !!id,
    })
}

export default useTest;