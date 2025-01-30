import { useCallback, useState } from "react";
import loadingStatus from "../helpers/LoadingStatus";

const BaseUrl = "https://localhost:7014";

const useGetRequest = (url: string) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const get = useCallback(async (headers: HeadersInit) => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const rsp = await fetch(BaseUrl + url, {
                method: 'GET',
                headers: headers
            });

            if (!rsp.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await rsp.json();
            setLoadingState(loadingStatus.loaded);
            return result;
        } catch {
            setLoadingState(loadingStatus.hasErrored);
        }
    }, [url]);
    return { get, loadingState };
};

const useDeleteRequest = (url: string) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const deleteReq = useCallback(async (id: number) => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const rsp = await fetch(BaseUrl + url + "/" + id, {
                method: 'DELETE'
            });

            if (!rsp.ok) {
                throw new Error('Network response was not ok');
            }

            setLoadingState(loadingStatus.loaded);

        } catch {
            setLoadingState(loadingStatus.hasErrored);
        }
    }, [url]);
    return { deleteReq, loadingState };
};

const usePostRequest = (url: string) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const post = useCallback(async (requestData) => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const response = await fetch(BaseUrl + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setLoadingState(loadingStatus.loaded);

            return await response.json();

        } catch {
            setLoadingState(loadingStatus.hasErrored);
        }
    }, [url]);
    return { post, loadingState };

};

const usePutRequest = (url: string) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const put = useCallback(async (id: number, requestData) => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const response = await fetch(BaseUrl + url + "/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setLoadingState(loadingStatus.loaded);

            return await response.json();

        } catch {
            setLoadingState(loadingStatus.hasErrored);
        }
    }, [url]);
    return { put, loadingState };

};

export const getRequest = useGetRequest;
export const postRequest = usePostRequest;
export const deleteRequest = useDeleteRequest;
export const putRequest = usePutRequest;
