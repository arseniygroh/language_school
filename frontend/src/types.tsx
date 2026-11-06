export type User = {
    id: string;
    email: string;
    username: string;
    token: string;
};

export type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};

export type LanguageClass = {
    id: string;
    title: string;
    language: string;
    level: string;
    type: string;
    teacher: string;
    date: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
};