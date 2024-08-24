import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from '../bookings/useBooking'
import { useEffect, useState } from "react";

import CheckBox from '../../ui/Checkbox'
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Spinner from '../../ui/Spinner'
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from '../settings/useSettings'
import { useCheckin } from "./useCheckin";


const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmedPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const { settings, isSettingLoading } = useSettings()
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin()


  useEffect(() => {
    setConfirmedPaid(booking?.is_paid)
  }, [booking?.is_paid])

  if (isLoading || isSettingLoading) return <Spinner />

  const {
    id: bookingId,
    guests,
    total_price,
    number_guests,
    has_breakfast,
    number_night,
  } = booking;

  const breakfastPrice = addBreakfast ? number_guests * number_night * settings.breakfast_price : 0

  function handleCheckin() {
    if (!confirmPaid) return
    if(addBreakfast) checkin({
      has_breakfast: true,
      extra_price: breakfastPrice,
      total_price: total_price + breakfastPrice
    })
    else checkin()
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!has_breakfast && <Box>
        <CheckBox onChange={() => {
          setAddBreakfast(add => !add)
          setConfirmedPaid(false)
        }}>
          Will you want breakfast for {formatCurrency(breakfastPrice)}?
        </CheckBox>
      </Box>}
      <Box>
        <CheckBox checked={confirmPaid} disabled={confirmPaid || isCheckingIn} id="payment" onChange={() => setConfirmedPaid(confirm => !confirm)}>I confirmed that {guests.full_name} paid total staying amount of {has_breakfast ? formatCurrency(total_price) : `${formatCurrency(total_price + breakfastPrice)} (${formatCurrency(total_price)} + ${formatCurrency(breakfastPrice)})`}</CheckBox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
