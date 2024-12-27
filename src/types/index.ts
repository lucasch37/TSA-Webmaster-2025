export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
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
