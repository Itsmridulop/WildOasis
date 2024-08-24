import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Spinner from '../../ui/Spinner'
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useCheckout } from "../check-in-out/useCheckout";


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout()
  const navigate = useNavigate()
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />

  const { id, status } = booking
  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'checked-in' && <Button onClick={() => {
          checkout(id)
          moveBack()
        }}>
          Check Out
        </Button>}
        {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${id}`)}>
          check In
        </Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
