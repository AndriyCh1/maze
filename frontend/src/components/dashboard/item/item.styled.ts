import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1rem;

  &:hover {
    background-color: #ebeced;
  }

  & > p {
    font-weight: 500;
  }
`;

export const RoomTitle = styled.h4`
  font-size: 18px;
`;

export const RoomInfoContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
`;

export const RoomDetails = styled.p`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-size: 15px;
`;

export const OwnerName = styled.span`
  font-weight: bold;
`;

export const ItemBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
