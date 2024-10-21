import axios from "axios";
import { router } from "expo-router";
import { createContext, useState } from "react";

// Define the type for the context provider's props
type AuthContextType = {
    children: React.ReactNode;
};

// Define the type for the context's value
type AuthContextProps = {
    email: string;
    token: string,
    AuthUser: (email: string, password: string) => void;
    username: string;
    rule: string;
};

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextProps>({
    email: " ",
    token: " ",
    AuthUser: () => {},
    username: "",
    rule:" ",
});

// Define the type for user information
type User = {
    email: string;
    password: string;
    username: string;
    rule:string;
}

// Define the AuthProvider component
export const AuthProvider = ({ children }: AuthContextType) => {
    // Initialize state variables
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [rule, setRule] = useState<string>('');

    // Function to authenticate the user
    const AuthUser = async (email: string, password: string) => {
        try {
            if (email !== '' && password !== '') {
                const response = await axios.post('http://localhost:5000/login', {
                    email: email,
                    username: " ",
                    password: password,
                    status: " ",
                    rules: " "
                });
                if (response.data !== 'Usuario não encontrado!') {
                    
                    setUsername(response.data.user.username);
                    setEmail(email);
                    setRule(response.data.user.rules);
                    setToken(response.data.token);
                    alert('Bem Vindo ' + response.data.user.username);
                    router.push("/explore");
                } else {
                    alert('Usuário não encontrado!');
                }
            } else {
                alert('Há campos vazios.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check for network error
                if (error.message === 'Network Error') {
                    alert('Inicie o backend na pasta executável, ou verifique a conexão com a internet.');
                } else if (error.response) {
                    // Check for specific status codes
                    if (error.response.status === 401) {
                        alert('Conta não encontrada! Verifique suas credenciais.');
                    } else {
                        alert('Erro ao autenticar: ' + error.response.data[3]);
                    }
                } else {
                    alert('Erro desconhecido: ' + error.message);
                }
            } else {
                alert('Erro ao autenticar');
            }
        }
    };


    // Return the context provider with the context value
    return (
        <AuthContext.Provider value={{ email: email, token: token, AuthUser , username, rule: rule}}>
            {children}
        </AuthContext.Provider>
    );
};