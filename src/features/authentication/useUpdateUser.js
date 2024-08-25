import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuthentication";

import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient()

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success('Data updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['user'],
            })
        },
        onError: error => {
            console.error(error.message)
            toast.error('There is some problem in updating data')
        }
    })
    return { updateUser, isUpdating }
}