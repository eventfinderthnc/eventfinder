import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface LoginStepProps {
    type: "attendee" | "organizer";
    onBack: () => void;
    onNext: () => void;
}

type LoginFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function LoginStep({ type, onBack, onNext }: LoginStepProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [submitError, setSubmitError] = useState("");
    const router = useRouter();

    const imageSrc =
        type === "attendee"
            ? "/images/svg/attendee_auth.svg"
            : "/images/svg/organizer_auth.svg";


    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: { email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setSubmitError("");
        try {
            if (isLogin || type === "organizer") {
                const { error } = await authClient.signIn.email({
                    email: data.email,
                    password: data.password,
                });
                if (error) throw new Error(error.message ?? "เกิดข้อผิดพลาด");
                const { data: sessionData } = await authClient.getSession();
                const role = sessionData?.user?.role;
                router.push(role === "ADMIN" ? "/admin/list" : "/");
            } else {
                const { error } = await authClient.signUp.email({
                    email: data.email,
                    password: data.password,
                    name: "username",
                    role: type === "attendee" ? "ATTENDEE" : "ORGANIZATION",
                    callbackURL: "/auth/attendee/onboarding",
                });
                if (error) throw new Error(error.message ?? "เกิดข้อผิดพลาด");
                onNext();
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
            setSubmitError(message);
        }
    };

    const googleLogin = async () => {
        setSubmitError("");
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/auth/attendee/google-redirect",
            });
            if (error) throw new Error(error.message ?? "เข้าสู่ระบบด้วย Google ไม่สำเร็จ");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
            setSubmitError(message);
        }
    };

    return (
        <div className="flex flex-col h-full justify-between gap-6">
            <div className="flex justify-between items-center">
                <ArrowLeft
                    onClick={onBack}
                    className="cursor-pointer text-text-gray hover:text-text-gray-hover"
                />
                <ArrowLeft className="text-white" />
            </div>
            <div className="flex flex-col justify-between items-center gap-6 w-full">
                <Image
                    src={imageSrc}
                    alt={type}
                    width={170}
                    height={170}
                    className="w-[152px] h-auto"
                />
                <div className="flex flex-col justify-between items-center gap-6 w-full">
                    <h1 className="text-[26px] font-semibold">
                        {type === "attendee"
                            ? isLogin
                                ? "เข้าสู่ระบบผู้เข้าร่วม"
                                : "ลงทะเบียนผู้เข้าร่วม"
                            : "เข้าสู่ระบบผู้จัดกิจกรรม"}
                    </h1>
                    <form
                        id="login-form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2.5 items-center justify-between w-full"
                    >
                        <div className="w-full flex flex-col gap-1">
                            <Input
                                placeholder="อีเมล"
                                type="email"
                                className="w-full focus:border-primary"
                                aria-invalid={!!errors.email}
                                {...register("email", {
                                    required: "กรุณากรอกอีเมล",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "รูปแบบอีเมลไม่ถูกต้อง",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <Input
                                type="password"
                                placeholder="รหัสผ่าน"
                                className="w-full focus:border-primary"
                                aria-invalid={!!errors.password}
                                {...register("password", {
                                    required: "กรุณากรอกรหัสผ่าน",
                                    minLength: {
                                        value: 6,
                                        message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                        {!isLogin && (
                            <div className="w-full flex flex-col gap-1">
                                <Input
                                    type="password"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    className="w-full focus:border-primary"
                                    aria-invalid={!!errors.confirmPassword}
                                    {...register("confirmPassword", {
                                        required: "กรุณายืนยันรหัสผ่าน",
                                        validate: (value) =>
                                            value === getValues("password") || "รหัสผ่านไม่ตรงกัน",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        )}
                        {submitError && (
                            <p className="text-red-500 text-sm w-full">{submitError}</p>
                        )}
                    </form>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    type="submit"
                    form="login-form"
                    className="h-10.5 text-base"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLogin || type === "organizer" ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                </Button>

                {type === "attendee" && (
                    <Button
                        type="button"
                        variant="outline"
                        className="border-stroke h-10.5 text-base w-full flex items-center justify-center gap-2 bg-white hover:bg-white text-black/54 hover:text-black/54"
                        disabled={isSubmitting}
                        onClick={googleLogin}
                    >
                        <Image
                            src="/images/svg/google_logo.svg"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        เข้าสู่ระบบด้วย Google
                    </Button>
                )}

                {type === "organizer" && (
                    <div className="text-center text-sm text-text-gray mt-2">
                        หากต้องการสร้างแอคเค้าให้ติดต่อแอดมินผ่านไอจี <span className="font-semibold text-primary">@cuatclub</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between flex-row">
                <div className="flex flex-col items-start">
                    {/* Forgot Password Link - Common for both? */}
                    {/* Attendee Toggle */}
                    {type === "attendee" && (
                        <>
                            <Link href="" className={`${isLogin ? "flex" : "hidden"}`}>
                                <span className="font-regular text-sm text-text-gray underline">
                                    ลืมรหัสผ่าน
                                </span>
                            </Link>
                            <button onClick={() => setIsLogin(!isLogin)}>
                                <span className="font-regular text-sm text-text-gray underline">
                                    {isLogin ? "ยังไม่มีบัญชี? ลงทะเบียน" : "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ"}
                                </span>
                            </button>
                            {/* Spacer to keep layout consistent if needed, or remove */}
                            <Link href="" className={`opacity-0 ${isLogin ? "hidden" : "flex"}`}>
                                <span className="font-regular text-sm text-text-gray underline">
                                    Nothing just free space
                                </span>
                            </Link>
                        </>
                    )}
                    {/* Organizer specific links? Organizer just has login */}
                    {type === "organizer" && (
                        <Link href="">
                            <span className="font-regular text-sm text-text-gray underline">
                                ลืมรหัสผ่าน
                            </span>
                        </Link>
                    )}

                </div>

                {/* Switch Role Link */}
                <Link href={type === "attendee" ? "/auth/organizer/login" : "/auth/attendee/login"}>
                    <span className="font-regular text-sm text-text-gray underline">
                        {type === "attendee" ? "ลงชื่อในฐานะผู้จัดกิจกรรม" : "ลงชื่อในฐานะผู้เข้าร่วมกิจกรรม"}
                    </span>
                </Link>
            </div>
        </div>
    );
}
