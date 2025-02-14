import LoginForm from "@/features/user/components/login-form";
import React from "react";

const LoginPage = async (): Promise<React.JSX.Element> => {
    return (
        <div className="container mx-auto mt-24 h-full">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
