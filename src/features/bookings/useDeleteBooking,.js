import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient()

    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),

        onSuccess: () => {
            toast.success('Booking deleted suxxessfully!!!')
            queryClient.invalidateQueries({ active: true })
        },

        onError: error => {
            toast.error('Error deleting booking')
            console.error(error.message)
        }
    })
    return { deleteBooking, isDeleting }
}