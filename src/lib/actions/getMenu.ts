"use server";

import {APP_CONFIG} from "@/config";
import {MenuResponse} from "@/types";

export async function getMenu(): Promise<MenuResponse> {
    try {
        const response = await fetch(`${APP_CONFIG.api.serverUrl}/api/getMenu`, {
            method: "GET",
        });

        if (!response.ok) {
            return {
                success: false,
                message: "Failed to fetch menu",
            };
        }

        return {
            success: true,
            message: "Fetched Menu Successfully",
            data: await response.json(),
        };
    } catch {
        return {success: false, message: "Failed to fetch menu"};
    }
}
