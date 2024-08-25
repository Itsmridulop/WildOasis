import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout as logoutApi} from '../../services//apiAuthentication'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            navigate('/login', {replace: true})
            queryClient.removeQueries()
            toast.success('You are successfully loged out!!!')
        },
        onError: () => {
            toast.error('Something went wrong!!!')
        }
    })
    return {logout, isLoading}
}