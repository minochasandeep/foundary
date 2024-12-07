import { HttpWrapper } from "@/utils";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import useSWR, { Key, MutatorOptions } from "swr"
import eventEmitter from "@/utils/event-emitter/event-emitter";

interface NotificationProps {
    handleSuccess?: boolean;
    handleError?: boolean;
    successMessage?: string;
    errorMessage?: string;
}

const handleSuccessResponse = (res: any, notificationProps: NotificationProps) => {
    if (notificationProps.handleSuccess) {
        eventEmitter.emit("Success", notificationProps.successMessage || "Request Processed Successfully");
    }
}


const handleErrorResponse = (res: any, notificationProps: NotificationProps) => {
    if (notificationProps.handleError) {
        if (res.validations && res.validations.length > 0) {
            const errors = res.validations.map((error: any) => error.error).join("\n ");
            eventEmitter.emit("Error", notificationProps.errorMessage || errors || "An error occurred");
        } else {
            eventEmitter.emit("Error", notificationProps.errorMessage || res.message || "An error occurred");
        }
    }
    // throw new Error(res.message || "An error occurred");

}

export async function postData<ResponseType = any, RequestType = any>(url: string, { arg }: { arg: RequestType }, token: string, notificationProps: NotificationProps): Promise<ResponseType> {
    const httpWrapper = new HttpWrapper();
    const res = await httpWrapper.post<ResponseType>(url, arg, token).catch((err) => {
        handleErrorResponse(err, notificationProps);
        throw err;
    });

    if (!res.result || !res.ok) {
        handleErrorResponse(res, notificationProps);
    } else {
        handleSuccessResponse(res, notificationProps);
    }

    return res.result as ResponseType;

};

async function patchData<ResponseType = any, RequestType = any>(url: string, { arg }: { arg: RequestType }, token: string, notificationProps: NotificationProps): Promise<ResponseType> {
    const httpWrapper = new HttpWrapper();
    const res = await httpWrapper.patch<ResponseType>(url, arg, token).catch((err) => {
        handleErrorResponse(err, notificationProps);
        throw err;
    });

    if (!res.result || !res.ok) {
        handleErrorResponse(res, notificationProps);
    } else {
        handleSuccessResponse(res, notificationProps);
    }

    return res.result as ResponseType;
};

async function deleteData<ResponseType = any, RequestType = any>(url: string, { arg }: { arg: RequestType }, token: string, notificationProps: NotificationProps): Promise<ResponseType> {
    const httpWrapper = new HttpWrapper();
    const res = await httpWrapper.delete<ResponseType>(url, arg, token).catch((err) => {
        handleErrorResponse(err, notificationProps);
        throw err;
    });

    if (!res.result || !res.ok) {
        handleErrorResponse(res, notificationProps);
    } else {
        handleSuccessResponse(res, notificationProps);
    }

    return res.result as ResponseType;
};

/**
 * Used in the scenario that you only want to post without fetching
 */
export const useSwrPost = <ResponseType = any, RequestType = any>(url: string, notificationProps: NotificationProps = { handleError: true, handleSuccess: true }, options?: MutatorOptions) => {
    const token = useSession().data?.access_token as string;
    const postDataWithToken = async (url: string, { arg }: { arg: RequestType }) => postData(url, { arg }, token, notificationProps);

    return useSWRMutation<ResponseType, any, Key, RequestType>(url, postDataWithToken, options);
};


/**
 * Used in the scenario that you only want to patch without fetching
 */
export const useSwrPatch = <ResponseType = any, RequestType = any>(url: string, notificationProps: NotificationProps = { handleError: true, handleSuccess: true }, options?: MutatorOptions) => {
    const token = useSession().data?.access_token as string;
    const patchDataWithToken = async (url: string, { arg }: { arg: RequestType }) => patchData(url, { arg }, token, notificationProps);

    return useSWRMutation<ResponseType, any, Key, RequestType>(url, patchDataWithToken, options);
};

/**
 * Used in the scenario that you want to delete data 
 */
export const useSwrDelete = <ResponseType = any, RequestType = any>(url: string, notificationProps: NotificationProps = { handleError: true, handleSuccess: true }, options?: MutatorOptions) => {
    const token = useSession().data?.access_token as string;
    const deleteDataWithToken = async (url: string, { arg }: { arg: RequestType }) => deleteData(url, { arg }, token, notificationProps);

    return useSWRMutation<ResponseType, any, Key, RequestType>(url, deleteDataWithToken, options);
};

/**
 * Used in the scenario that :
 * 1.) You want to fetch data immediately
 * 2.) You update data against the same request
 * 3.) Your post request returns the same object type as the initial get request
 */
export const useSwrWithTrigger = <ResponseType = any, RequestType = any>(url?: string, notificationProps: NotificationProps = { handleError: true, handleSuccess: true }, options: MutatorOptions = { revalidate: false, populateCache: true }) => {
    const swr = useSWR<ResponseType>(url);
    const token = useSession().data?.access_token as string;
    const trigger = (data: RequestType) => url ? swr.mutate(postData(url, { arg: data }, token, notificationProps), options) : () => { };

    return { ...swr, trigger };
};

/**
 * Used in the scenario that :
 * 1.) You want to fetch data immediately
 * 2.) You update data against the same request
 */
export const useSwrPatchWithTrigger = <ResponseType = any, RequestType = any>(url?: string, notificationProps: NotificationProps = { handleError: true, handleSuccess: true }, options: MutatorOptions = { revalidate: false, populateCache: true }) => {
    const swr = useSWR<ResponseType>(url);
    const token = useSession().data?.access_token as string;
    const trigger = (data: RequestType) => url ? swr.mutate(patchData(url, { arg: data }, token, notificationProps), options) : () => { };

    return { ...swr, trigger };
};
