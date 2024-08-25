import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from '../../services/apiAuthentication'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate()

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: () => {
            toast.success('User logedin successfully!!!')
            navigate('/')
        },

        onError: error => {
            toast.error('Error:'+ error.message)
        }

    })
    return { login, isLoading }
}