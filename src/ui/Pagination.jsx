import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({count}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))
  const searchObj = {filter: searchParams.get('filter'), sortBy: searchParams.get('sortBy')}  

  if(Math.ceil(count / PAGE_SIZE) <= 1) return null

  return (
    <StyledPagination>
      <PaginationButton onClick={() => setSearchParams({...searchObj, page: page-1})} disabled={page === 1}>
        <HiChevronLeft /> <span>Pervious</span>
      </PaginationButton>
      <P>
        Showing <span>{(page - 1) * PAGE_SIZE + 1}</span> to <span>{page === Math.ceil(count / PAGE_SIZE) ? count : page * PAGE_SIZE}</span> out of <span>{count}</span> result
      </P>
      <PaginationButton onClick={() => setSearchParams({...searchObj, page: page+1})} disabled={page === Math.ceil(count / PAGE_SIZE)}>
        <span>Next</span><HiChevronRight />
      </PaginationButton>
    </StyledPagination>
  )
}

export default Pagination
