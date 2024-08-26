import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAfterDate } from '../../services/apiBookings'
import { useSearchParams } from "react-router-dom";

export function useResentStays() {
    const [searchParams] = useSearchParams()
    const numDays = Number(searchParams.get('filter'))
    const queryDate = subDays(new Date(), numDays).toISOString()
    const { data: stays, isLoading } = useQuery({
        queryKey: ['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    })
    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'chedcked-out')
    return { stays,confirmedStays, isLoading }
} 