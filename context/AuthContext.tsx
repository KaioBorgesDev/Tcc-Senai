import { createContext } from "react";


type AuthContextType = {
    children: React.ReactNode;
};

type AuthContextProps = {
    nome: string;
    func: () => void;
    user: string;
};
export const AuthContext = createContext<AuthContextProps>({
    nome: "",
    func: () => {},
    user: "",
});

export const AuthProvider = ({ children }: AuthContextType) => {
    const func = () => {
        alert('oi');
    };

    return (
        <AuthContext.Provider value={{ nome: "kaio", func, user: "usuário" }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;