import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

function CabinTableOperation() {
  const [searchParams] = useSearchParams({filter: 'all', sortBy: 'name-asc'})
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/cabins?filter=${searchParams.get('filter')}&sortBy=${searchParams.get('sortBy')}`)
  }, [])

  return (
    <TableOperations>
      <Filter />
      <SortBy options={[
        { value: 'name-asc', label: 'By name (A-Z)' },
        { value: 'name-desc', label: 'By name (Z-A)' },
        { value: 'price-asc', label: 'By price (low - high)' },
        { value: 'price-desc', label: 'By price (high - low)' },
        { value: 'max_capacity-desc', label: 'By capacity (low - high)' },
        { value: 'max_capacity-desc', label: 'By capacity (high - low)' }
      ]} />
    </TableOperations>
  )
}

export default CabinTableOperation
