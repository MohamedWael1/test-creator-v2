import { Password, User } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import useRegister from "../../hooks/useRegister";
import { RegisterFormData } from "../../types";
import Input from "@/features/ui/Input/Input";
import Button from "@/features/ui/Button/Button";
import ErrorMessage from "@/features/ui/ErrorMessage";
import { useRouter } from "next/router";
import Spinner from "@/features/ui/Spinner";
import Link from "next/link";

function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();
    const { isLoading, mutate } = useRegister();
    const onSubmit = (data: RegisterFormData) => {
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
                    <h1>Create an account to get started</h1>
                </div>
                <div className="pb-4">
                    <Input
                        size="lg"
                        className="w-full"
                        placeholder="Enter your name"
                        aria-label="name"
                        type="text"
                        id="name"
                        {...register("name", { required: true, minLength: 3 })}
                    />
                    {errors.name ? (
                        <ErrorMessage>This Field is Required</ErrorMessage>
                    ) : (
                        ""
                    )}
                </div>

                <div className="pb-4">
                    <Input
                        size="lg"
                        className="w-full"
                        type="email"
                        id="email"
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

                <Button isLoading={isLoading} className="w-full my-4">
                    Register
                </Button>
                <Link href="/login">
                    <p>
                        already have an account? {""}
                        <a className="text-sm text-slate-500">login</a>
                    </p>
                </Link>
            </div>
        </form>
    );
}

export default RegisterForm;
