import auth from "@/lib/auth";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RegisterFormData } from "../types";

function useRegister() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RegisterFormData) => auth.register(data),
        mutationKey: ["user"],
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export default useRegister;