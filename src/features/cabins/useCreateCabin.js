import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabin"

import toast from "react-hot-toast"

export const useCreateCabin = () => {
    const queryClient = useQueryClient()

    const { mutate: createCabin, isLoading: isAdding } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success('New cabin created successfully')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (error) => toast.error(error.message)
    })
    return { createCabin, isAdding }
}