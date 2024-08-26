import { Link } from "react-router-dom";

import CheckoutButton from '../check-in-out/CheckoutButton'
import styled from "styled-components";
import Button from '../../ui/Button'
import Tag from '../../ui/Tag'

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, number_night } = activity
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}
      <span>{""}</span>
      <Guest>{guests.full_name}</Guest>
      <div >{number_night} night</div>
      {status === 'unconfirmed' && <Button size='small' as={Link} to={`/checkin/${id}`}>Check In</Button>}
      {status === 'checked-in' && <CheckoutButton bookingId={id}>Check In</CheckoutButton>}
    </StyledTodayItem>
  )
}

export default TodayItem

