import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthentication";
import { FaLessThanEqual } from "react-icons/fa";

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })
    return { isLoading, user, isAuthenticated: user?.role === 'authenticated' ?? FaLessThanEqual}
}