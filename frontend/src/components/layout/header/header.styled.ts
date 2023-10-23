import styled from "styled-components";

export const StyledHeader = styled.nav`
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    text-decoration: none;
    margin: 0 10px;
    padding: 5px 0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #1677ff;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }
`;
