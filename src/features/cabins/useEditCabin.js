import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabin"

import toast from "react-hot-toast"

export const useEditCabin = () => {
    const queryClient = useQueryClient()


    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('New cabin edited successfully')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (error) => toast.error(error.message)
    })
    return { editCabin, isEditing }
}