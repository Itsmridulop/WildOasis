import { useMutation } from "@tanstack/react-query";
import { signup as signupApi} from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useSignUp() {
    const {mutate: signUp, isLoading} = useMutation({
        mutationFn: signupApi,
        onSuccess: data => {
            console.log(data)
            toast.success('User is successfully created!!!')
        }
    })
    return {signUp, isLoading}
}