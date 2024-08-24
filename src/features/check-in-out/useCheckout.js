import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient()

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => {
            updateBooking(bookingId, {
            status: 'checked-out'
        })},

        onSuccess: () => {
            toast.success(`Booking successfully checked out!!!`)
            queryClient.invalidateQueries({ active: true })
        },

        onError: error => {
            toast.error(`There is problem in checking out of this booking`)
            console.error(error.message)
        }
    })
    
    return {checkout, isCheckingOut}
}