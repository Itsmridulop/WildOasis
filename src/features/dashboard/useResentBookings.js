import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from '../../services/apiBookings'
import { useSearchParams } from "react-router-dom";

export function useResentBooking() {
    const [searchParams] = useSearchParams()
    const numDays = Number(searchParams.get('filter'))
    const queryDate = subDays(new Date(), numDays).toISOString()
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })
    return {bookings, isLoading}
}