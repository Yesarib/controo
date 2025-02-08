"use client";

import { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

interface UserContextType {
    userId: string | null;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Cookie adının doğru olduğundan emin olun
        const cookieValue = getCookie("sb-lfasbkgwbiippxtxyady-auth-token")?.toString();

        if (cookieValue) {
            try {
                // Token'ı decode etme işlemi
                const decoded = JSON.parse(atob(cookieValue.split("-")[1]));
                setUserId(decoded.user.id);
            } catch (error) {
                console.error("Token decode error:", error); // Decode işlemi başarısız olduğunda hata
            }
        } else {
            console.log("Cookie bulunamadı.");  // Cookie yoksa loglama
        }
    }, []);

    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
};
