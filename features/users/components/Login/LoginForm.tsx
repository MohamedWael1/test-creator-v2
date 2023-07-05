import Button from "@/features/ui/Button/Button";
import ErrorMessage from "@/features/ui/ErrorMessage/ErrorMessage";
import Input from "@/features/ui/Input/Input";
import useLogin from "../../hooks/useLogin";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types";
import { useRouter } from "next/router";
import Link from "next/link";

function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();
    const { isLoading, mutate } = useLogin();
    const onSubmit = (data: LoginFormData) => {
        mutate(
            { ...data },
            {
                onError: (err) => {
                    console.log(err);
                },
                onSuccess: () => {
                    router.push("/dashboard/tests");
                },
            }
        );
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center flex-col rounded-sm  shadow-md bg-white p-10">
                <div className="py-10 text-lg font-semibold text-slate-500">
                    <h1>Login To Start</h1>
                </div>

                <div className="pb-4">
                    <Input
                        size="lg"
                        className="w-full"
                        id="email"
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter Your Email"
                        aria-label="email"
                    />
                    {errors.email ? (
                        <ErrorMessage>This Field is Required</ErrorMessage>
                    ) : (
                        ""
                    )}
                </div>

                <div className="pb-4">
                    <Input
                        size="lg"
                        className="w-full"
                        placeholder="Enter your password"
                        aria-label="password"
                        type="password"
                        id="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 14,
                        })}
                    />
                    {errors.password ? (
                        <ErrorMessage>This Field is Required</ErrorMessage>
                    ) : (
                        ""
                    )}
                </div>

                <Button size="lg" className="w-full" isLoading={isLoading}>
                    Login
                </Button>
                <Link href="/register">
                    <p>
                        Don't have an account? {""}
                        <a className="text-sm text-slate-500">Register</a>
                    </p>
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;
