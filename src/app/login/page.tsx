import LoginForm from "@/features/user/components/login-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = async (): Promise<React.JSX.Element> => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="h-full flex flex-col items-center justify-center p-6 space-y-6 lg:space-y-0 lg:relative">
                <div className="lg:absolute lg:top-10 lg:left-12">
                    <Link href={"/"} className="flex items-center gap-2">
                        <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                            Sprout &<br />
                            About
                        </div>
                    </Link>
                </div>

                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>

                <div className="border-2 rounded-xl p-4 flex flex-col w-full max-w-xs sm:max-w-sm lg:w-[20rem] text-primary bg-background/40 shadow-md lg:absolute lg:bottom-8 lg:left-8">
                    <div className="font-semibold text-base underline">TSA Judges:</div>
                    <div className="mt-1">Email: tsajudge@webmaster.org</div>
                    <div>Password: TSA2025!</div>
                </div>
            </div>
            <div className="h-screen items-center justify-center hidden lg:flex border-l-4">
                <div className="w-full h-full overflow-hidden flex">
                    <Image
                        src={"/login-img.jpeg"}
                        width={1000}
                        height={1000}
                        alt="Restaurant Image"
                        className="object-cover w-full"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
