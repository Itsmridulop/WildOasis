import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from '../../services/apiAuthentication'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: user => {
            toast.success('User logedin successfully!!!')
            queryClient.setQueryData(['user'], user.user)
            navigate('/', { replace: true })
        },

        onError: error => {
            toast.error('Error:' + error.message)
        }

    })
    return { login, isLoading }
}