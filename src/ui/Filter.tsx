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

const FilterButton = styled.button<{$activeVal: boolean}>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
      props?.$activeVal &&
      css`
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
      `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export const Filter = ({filterField, options}: {filterField: string, options: object}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || Object.keys(options)[0];

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    // if (searchParams.get("page")) searchParams.set("page", '1');
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {Object.entries(options).map(optionArr => (
          <FilterButton $activeVal={currentFilter === optionArr[0]} key={optionArr[0]} onClick={() => handleClick(optionArr[0])}>{optionArr[1]}</FilterButton>
      ))}
      {/*{options.map(item => (*/}
      {/*  <FilterButton key={item} onClick={() => handleClick(item)}>{item}</FilterButton>*/}
      {/*))}*/}
    </StyledFilter>
  );
}

