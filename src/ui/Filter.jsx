import { useSearchParams } from "react-router-dom";

import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, from }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsObj = { filter: searchParams.get('filter'), sortBy: searchParams.get('sortBy'), page: searchParams.get('page') }

  const handleClick = value => {
    setSearchParams({ ...searchParamsObj, filter: value, page: 1})
  }

  return (
    <StyledFilter>
      {options.map(option => <FilterButton key={from} active={searchParams.get('filter') === option.value} onClick={() => handleClick(option.value)}>{option.label}</FilterButton>)}
    </StyledFilter>
  )
}

export default Filter
