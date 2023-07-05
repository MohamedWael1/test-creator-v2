import client from "@/lib/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { Test } from "../types";

async function getTests(userId: User["id"]) {
    const res = await client.get(`/api/tests?userId=${userId}`)
    return res.data
}

function useTests(userId: User["id"]) {
    return useQuery({
        queryFn: () : Promise<Test[]> => getTests(userId),
        queryKey: ["tests"]
    })
}

export default useTests;