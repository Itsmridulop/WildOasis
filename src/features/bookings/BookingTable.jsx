import { useBookings } from './useBookings'

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from '../../ui/Spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function BookingTable() {
  const [searchParams] = useSearchParams({ filter: 'all', sortBy: 'start_data-desc' })
  const { bookings, isLoading } = useBookings()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/bookings?filter=${searchParams.get('filter')}&sortBy=${searchParams.get('sortBy')}`)
  }, [])

  if (isLoading) return <Spinner />

  // const processedBooking = bookings.map(booking => {
  //   return {
  //     ...booking,
  //     start_date: booking.start_date.split('T')[0].split('-').join('')
  //   }
  // })


  // const sortBy = searchParams.get('sortBy')
  // const [field, value] = sortBy.split('-')
  // const modifier = value === 'desc' ? -1 : 1
  // const filterBy = searchParams.get('filter')
  // let filteredBooking = bookings

  // if (filterBy === 'checked-out') filteredBooking = processedBooking.filter(booking => booking.status === 'checked-out')
  // if (filterBy === 'checked-in') filteredBooking = processedBooking.filter(booking => booking.status === 'checked-in')
  // if (filterBy === 'unconfirmed') filteredBooking = processedBooking.filter(booking => booking.status === 'unconfirmed')
  
  // filteredBooking = filteredBooking.sort((a,b) => (a[field] - b[field]) * modifier)

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={bookings} render={(booking) => (
          <BookingRow key={booking.id} booking={booking} />
        )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
