import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamsObj = {filter: searchParams.get('filter'), sortBy: searchParams.get('sortBy')}
    const handleChange = e => {
        setSearchParams({...searchParamsObj, sortBy: e.target.value, page: 1})
    }

    return (
        <Select options={options} onChange={handleChange} />
    )
}

export default SortBy
