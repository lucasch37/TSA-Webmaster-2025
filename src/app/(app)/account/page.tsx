import {getUserData, getUserOrders} from "@/features/checkout/actions/orders";
import {getMenu} from "@/features/menu/actions/getMenu";
import {logoutUser} from "@/features/user/actions/auth";
import {getUser} from "@/features/user/actions/getUser";
import {createClient} from "@/lib/supabase/server";
import {Reservation} from "@/types";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import React from "react";
import Account from "./account";

export const metadata: Metadata = {
    title: "Account | Sprout & About",
    description: "View your order history and sustainability impact",
};

export default async function AccountPage(): Promise<React.JSX.Element> {
    const supabase = createClient();
    const user = await getUser();
    if (!user) {
        throw redirect("/login");
    }
    const [userData, orders] = await Promise.all([getUserData(), getUserOrders()]);

    if (!userData) {
        throw Error("User data not found");
    }

    const {data: userReservations} = await supabase
        .from("reservations")
        .select("*")
        .order("date", {ascending: false})
        .eq("uid", user.id);

    const menuRes = await getMenu();

    if (!menuRes.data) {
        throw Error("Menu data not found");
    }

    let reservations = userReservations as Reservation[];

    if (!userReservations) {
        reservations = [];
    }

    const logout = async (): Promise<void> => {
        "use server";
        const logoutRes = await logoutUser();
        if (logoutRes.success) {
            redirect("/");
        }
    };

    return (
        <div>
            <Account
                user={user}
                userData={userData}
                orders={orders}
                reservations={reservations}
                logout={logout}
                menu={menuRes.data}
            />
        </div>
    );
}
