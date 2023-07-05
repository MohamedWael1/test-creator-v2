import auth from "@/lib/auth";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginFormData } from "../types";

function useLogin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: LoginFormData) => auth.login(data),
        mutationKey: ["user"],
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        },
        onError: (err) => {
            console.log(err)
        }
    }
    )
}

export default useLogin;