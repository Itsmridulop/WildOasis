import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi } from "../../services/apiSettings"
import toast from "react-hot-toast"

export const useUpdateSettings = () => {
    const queryClient = useQueryClient()
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success('setting updated successfully!!!')
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        },
        onError: () => {
            toast.error('unable update setting!!!')
            console.error(error.message)
        }
    })

    return {updateSetting, isUpdating}
}