import LoginForm from "@/components/login/login-form";
import {getUser} from "@/lib/actions/getUser";
import {redirect} from "next/navigation";
import React from "react";

const LoginPage = async (): Promise<React.JSX.Element> => {
    const user = await getUser();
    if (user) {
        redirect("/account");
    }
    return (
        <div className="container mx-auto mt-24 h-full">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
