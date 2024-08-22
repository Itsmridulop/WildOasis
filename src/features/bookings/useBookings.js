import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"

export const useBookings = () => {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('filter') !== 'all' ? { value: searchParams.get('filter'), field: 'status' } : null
    const sortByRaw = searchParams.get('sortBy') || 'start_date-desc'
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
    const [field, value] = sortByRaw.split('-')
    const sortBy = { field, value }
    const { data: { data: bookings, count } = {}, isLoading } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings(filter, sortBy, page)
    })
    if (page < Math.ceil(count / PAGE_SIZE))
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings(filter, sortBy, page + 1)
        })
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings(filter, sortBy, page - 1)
        })
    return { bookings, isLoading, count }
}