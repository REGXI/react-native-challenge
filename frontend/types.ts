
export interface ChatItem {
    id: string;
    name: string;
    image: string;
    message: string;
    has_read: boolean;
    updated_at: string;
}

export interface ChatItemEditDTO {
    name: string;
    image: string;
    message: string;
    has_read: boolean;
}