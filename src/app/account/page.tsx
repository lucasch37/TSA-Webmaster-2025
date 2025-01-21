import React from "react";
import {Metadata} from "next";
import AccountClient from "@/components/account/account-client";

export const metadata: Metadata = {
    title: "Account | Sprout & About",
    description: "View your order history and sustainability impact",
};

export default function AccountPage(): React.JSX.Element {
    return <AccountClient />;
}
