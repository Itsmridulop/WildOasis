import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter from='cabin' options={[
        { value: "all", label: "All" },
        { value: "no-discount", label: "No Discount" },
        { value: "with-discount", label: "With Discount" }
      ]} />
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
