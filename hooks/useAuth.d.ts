export declare const useAuth: () => {
    token: any;
    userId: any;
    login: (token: any) => Promise<void>;
    logout: () => void;
};
