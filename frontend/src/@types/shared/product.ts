export type IProduct = {
    _id?: string;
    name?: string;
    description?: string;
    tags?: string[];
    quantity?: number;
    price?: number;
    image?: string;
    categoryId?: string,
    detail: Record<string, unknown>;
    discount: number;
    category: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}