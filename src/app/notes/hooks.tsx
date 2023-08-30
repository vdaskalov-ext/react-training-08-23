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
    })

const updateNote = (note: Note) =>
    fetch(`${environment.API_URL}/notes/${note.id}`, {
        method: 'PATCH',
        body: JSON.stringify({note}),
        ...getAuthHeader()
    })

const deleteNote = (note: Note) =>
    fetch(`${environment.API_URL}/notes/${note.id}`, {
        method: 'DELETE',
        ...getAuthHeader()
    })

export const useNotes = () => {
    const {data} = useQuery({queryKey, queryFn: fetchNotes})
    return data?.notes || {};
}

export const useAddNote = () => {
    const queryClient = useQueryClient();
    return useMutation(addNote, {
        onSuccess: () => invalidateQueryCache(queryClient),
    })
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation(updateNote, {
        // onSuccess: () => invalidateQueryCache(queryClient),
        onMutate: async (note: Note) => {
            console.log(' -> onMutate')
            await queryClient.cancelQueries({queryKey})
            const previousNotes = queryClient.getQueryData(queryKey)

            // Optimistically update to the new value
            queryClient.setQueryData(queryKey, (old: Record<string, Note> | undefined) => ({...old, [note.id!!]: note}));

            console.log({previousNotes})

            // Return a context object with the snapshotted value
            return { previousNotes }
        },
        onError: (err, updateNote, context) => {
            queryClient.setQueryData(queryKey, context?.previousNotes);
        },
        onSettled: () => {
            console.log(" -> onSettled")
            return invalidateQueryCache(queryClient);
        },
    })
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteNote, {
        onSuccess: () => invalidateQueryCache(queryClient)
    })
}