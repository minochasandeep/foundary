import { useSession } from "next-auth/react";


export const useFetcher = () => {
    const session = useSession();

    const fetcher = async (resource: string, init?: RequestInit): Promise<any> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${resource}`, {
            ...init,
            headers: {
                Authorization: `Bearer ${session.data?.access_token}`,
            },
        });

        const response = await res.json();

        if (!res.ok || response.status === "error") {
            throw new Error(response);
        }

        return response.data;
    };

    return { fetcher }
};


export default useFetcher;