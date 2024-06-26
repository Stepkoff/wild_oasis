import styled from 'styled-components'
import {Logo} from "@/ui/Logo.tsx";
import {MainNav} from "@/ui/MainNav.tsx";
// import Uploader from '@/data/Uploader.jsx';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem
`

export const Sidebar = () => {


  return (
    <StyledSidebar>
      <Logo/>
      <MainNav />
      {/*<Uploader/>*/}
    </StyledSidebar>
  )
}