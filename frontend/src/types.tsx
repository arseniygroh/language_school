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