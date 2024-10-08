import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResentBooking } from "./useResentBookings";
import { useResentStays } from "./useResentStays";
import { useCabin } from '../cabins/useCabin'

import Spinner from '../../ui/Spinner'
import styled from "styled-components";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ filter: '7' })
  const { cabins, isLoading: isCabinLoading } = useCabin()
  const { bookings, isLoading: isBookingLoading } = useResentBooking()
  const { confirmedStays, isLoading } = useResentStays()
  useEffect(() => { navigate(`/dashboard?filter=${searchParams.get('filter')}`) }, [])
  if (isLoading || isBookingLoading || isCabinLoading) return <Spinner />
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
