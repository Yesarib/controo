import { UserContext } from "@/context/user-context";
import { useContext } from "react";

export const useUser = () => {
    const context = useContext(UserContext);
    // console.log(context);
    
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};