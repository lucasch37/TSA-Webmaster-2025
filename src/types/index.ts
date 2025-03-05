export interface MenuItem {
    id: number;
    type: string;
    tags: string[];
    name: string;
    price: number;
    description: string;
    ingredients: string[];
    items_to_remove: string[];
    items_to_add: string[];
    image_url: string;
    sale_percentage: number;
    health_stats: object;
    hidden: boolean;
}

export interface MenuResponse {
    success: boolean;
    message: string;
    data?: MenuItem[];
}

export interface CartItem {
    menuItemId: number;
    quantity: number;
    addedItems: string[];
    removedItems: string[];
}

export interface Cart {
    items: CartItem[];
}

export interface CustomerDetails {
    email: string;
    name: string;
    phone: string;
}

export interface User {
    id: string;
    sustainability_score: number;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    stripe_session_id: string;
    total_amount: number;
    sustainability_score: number;
    order_number: number;
    fulfilled: boolean;
    items: {
        menuItemId: number;
        name: string;
        quantity: number;
        price: number;
        addedItems: string[];
        removedItems: string[];
    }[];
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    created_at: string;
}
