import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabin"

import toast from "react-hot-toast"

export const useDeleteCabin = () => {
    const queryClien = useQueryClient()

    const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            queryClien.invalidateQueries({
                queryKey: ['cabins']
            })
            toast.success('Cabin is delete successfully')
        },
        onError: error => toast.error(error.message)
    })
    return {isDeleting, deleteCabin}
}