type User = {
    id: string;
    email: string;
    username: string;
    token: string;
};

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};