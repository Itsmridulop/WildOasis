import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

export function useCheckin() {
    const { bookingId } = useParams()
    const qureyClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (breakfast) => updateBooking(bookingId, {
            status: 'checked-in',
            is_paid: true,
            ...breakfast
        }),

        onSuccess: (data) => {
            toast.success(`Booking number ${data.id} is successfully checked in!!!`)
            qureyClient.invalidateQueries({ active: true })
            navigate('/')
        },

        onError: error => {
            console.error(error.message)
            toast.error('Error while checking in booking!!!')
        }
    })
    return {checkin, isCheckingIn}
}