import styled from "styled-components";
import logo from '/logo-light.png'
import {Link} from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export const Logo = () => {
  return (
    <StyledLogo>
      <Link to={'/dashboard'}>
        <Img src={logo} alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

