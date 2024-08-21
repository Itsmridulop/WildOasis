import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export const useBookings = () => {
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('filter') !== 'all' ? { value: searchParams.get('filter'), field: 'status' } : null
    const sortByRaw = searchParams.get('sortBy') || 'start_date-desc'
    const [field, value] = sortByRaw.split('-')
    const sortBy = {field, value}
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings(filter, sortBy)
    })
    return { bookings, isLoading }
}