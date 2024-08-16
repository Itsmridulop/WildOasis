import { useQuery } from "@tanstack/react-query"
import { getCabin } from "../../services/apiCabin"

export const useCabin = () => {
    const { data: cabins, isLoading } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabin
    })
    return { cabins, isLoading }
}