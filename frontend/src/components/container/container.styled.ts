import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1620px;
  padding: 30px 75px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 15px 35px;
  }

  @media screen and (max-width: 425px) {
    padding: 10px 15px;
  }
`;
