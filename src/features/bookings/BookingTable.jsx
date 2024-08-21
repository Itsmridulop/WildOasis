import { useBookings } from './useBookings'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from '../../ui/Spinner';

function BookingTable() {
  const [searchParams] = useSearchParams({ filter: 'all', sortBy: 'start_date-desc' })
  const { bookings, isLoading } = useBookings()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/bookings?filter=${searchParams.get('filter')}&sortBy=${searchParams.get('sortBy')}`)
  }, [])

  if (isLoading) return <Spinner />

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
