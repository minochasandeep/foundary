'use client';

import { createContext, useContext, ReactNode, useState } from "react";

type userFormContextType = {
    isDirty: boolean;
    setIsDirty: (value: boolean) => void;
    isRefresh:boolean;
    setRefreshNow: (value: boolean) => void;
};

const userFormContextDefaultValues: userFormContextType = {
    isDirty: false,
    setIsDirty: () => {},
    isRefresh:false,
    setRefreshNow:(value: boolean) => {},
};

const UserFormContext = createContext<userFormContextType>(userFormContextDefaultValues);

// const IsDirtyContext = createContext<any>(null);
export function useUserDirtyForm() {
    return useContext(UserFormContext);
}

type Props = {
    children: ReactNode;
};
export function IsDirtyContextProvider({ children }: Props) {
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isRefresh, setRefreshNow] = useState<boolean>(false);


    return (
        <>
            <UserFormContext.Provider value={{isDirty, setIsDirty, isRefresh, setRefreshNow}}>
                {children}
            </UserFormContext.Provider>
        </>
    );
}
