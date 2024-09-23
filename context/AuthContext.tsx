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
    AuthUser: (email: string, password: string) => void;
    username: string;
    rule: string;
};

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextProps>({
    email: " ",
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
                    setUsername(response.data.username);
                    setEmail(email);
                    setRule(response.data.rules)
                    alert('Bem Vindo ' + response.data.username);
                    router.push("/explore");
                } else {
                    alert('Usuário não encontrado!');
            }
        } 
    }catch (error) {
        alert(error);
    };
}

    // Return the context provider with the context value
    return (
        <AuthContext.Provider value={{ email: email, AuthUser,username, rule: rule}}>
            {children}
        </AuthContext.Provider>
    );
};