import { useCabin } from './useCabin';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Table from '../../ui/Table'
import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import Menus from '../../ui/Menus'

function CabinTable() {
  const { cabins, isLoading } = useCabin()
  const [searchParams] = useSearchParams({filter: 'all', sortBy: 'name-asc'})
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/cabins?filter=${searchParams.get('filter')}&sortBy=${searchParams.get('sortBy')}`)
  }, [])

  const sortBy = searchParams.get('sortBy')
  const [field, direction] = sortBy.split('-')

  if (isLoading) return <Spinner />

  let filteredCabin = cabins
  const modifier = direction === 'desc' ? -1 : 1

  if (searchParams.get('filter') === 'no-discount') filteredCabin = cabins.filter(cabin => cabin.discount === 0)
  if (searchParams.get('filter') === 'with-discount') filteredCabin = cabins.filter(cabin => cabin.discount > 0)
  filteredCabin = filteredCabin.sort((a, b) => (a[field] - b[field]) * modifier )

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={filteredCabin} render={cabin => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}

export default CabinTable
