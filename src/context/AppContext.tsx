import { createContext, useState } from "react";

type AppProviderProp = {
    children: React.ReactNode
}

type AppContextProp = {
    currentJokeType: string,
    currentAmountJokeGenerated: number,
    changeCurrentAmountJokeGenerated: (amount: number) => void,
    changeCurrentJokeType: (type: string) => void
};

export const AppContext = createContext<AppContextProp | null>(null);

export const AppProvider = ({ children } : AppProviderProp) => {
    const [currentJokeType, setCurrentJokeType] = useState('random');
    const [currentAmountJokeGenerated, setCurrentAmountJokeGenerated] = useState(1);

    const changeCurrentJokeType = (type: string) => {
        setCurrentJokeType(type);
    };

    const changeCurrentAmountJokeGenerated = (amount: number) => {
        if(amount >= 1)
            setCurrentAmountJokeGenerated(amount);
        else
            setCurrentAmountJokeGenerated(1);
    }

    return(
        <AppContext.Provider value={{currentJokeType, currentAmountJokeGenerated, changeCurrentAmountJokeGenerated, changeCurrentJokeType}}>
            {children}
        </AppContext.Provider>
    )
}

