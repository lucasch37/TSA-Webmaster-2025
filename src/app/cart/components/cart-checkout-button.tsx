"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface CartCheckoutButtonProps {
    hasItems: boolean;
}

export default function CartCheckoutButton({
    hasItems,
}: CartCheckoutButtonProps): React.JSX.Element {
    const router = useRouter();

    return (
        <Button
            className="w-full mt-4"
            onClick={() => router.push("/checkout")}
            disabled={!hasItems}
        >
            Proceed to Checkout
        </Button>
    );
}
