import { useSession } from "next-auth/react";
import { postData } from "./swr-hooks";

/**
 * Used in the scenario that you only want to post without swr library using dynamic urls
 */
export const usePost = <RequestType = any>(defaultUrl?: string,) => {
    const token = useSession().data?.access_token as string;
    const postDataWithToken = async (url: string, { arg }: { arg: RequestType }) => postData(url, { arg }, token, { handleError: false, handleSuccess: false });

    return async (input: { url?: string, data: RequestType }) => {
        const pUrl = input.url || defaultUrl || "";
        const response = await postDataWithToken(pUrl, { arg: input.data });
        return response;
    };
};
