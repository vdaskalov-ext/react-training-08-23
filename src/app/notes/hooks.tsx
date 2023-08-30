import {environment} from "../../environments/environment";
import {getToken} from "../components/auth/auth-utils";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Note} from "./model/note";

const getAuthHeader = () => ({
    headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
})

const queryKey = ['notes']

const invalidateQueryCache = (queryClient: QueryClient) =>
    queryClient.invalidateQueries({queryKey})

const fetchNotes = () =>
    fetch(`${environment.API_URL}/notes`, getAuthHeader())
        .then(res => res.json() as unknown as Record<string, Note>);

const addNote = (note: Note) =>
    fetch(`${environment.API_URL}/notes`, {
        method: 'PUT',
        body: JSON.stringify({note}),
        ...getAuthHeader()
    }).then(res => res.json())

const updateNote = (note: Note) =>
    fetch(`${environment.API_URL}/notes/${note.id}`, {
        method: 'PATCH',
        body: JSON.stringify({note}),
        ...getAuthHeader()
    }).then(res => res.json())

export const useNotes = () => {
    const {data} = useQuery({queryKey, queryFn: fetchNotes})
    return data?.notes || {};
}

export const useAddNote = () => {
    const queryClient = useQueryClient();
    return useMutation(addNote, {
        onSuccess: () => invalidateQueryCache(queryClient)
    })
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation(updateNote, {
        onSuccess: () => invalidateQueryCache(queryClient)
    })
}