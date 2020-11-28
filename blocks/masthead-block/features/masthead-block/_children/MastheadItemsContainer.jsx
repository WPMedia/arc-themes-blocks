import styled from 'styled-components';

const MastheadItemsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  > div {
    align-items: flex-end;
    display: flex;
    flex: 1;
    justify-content: center;
    padding-bottom: 9px;
    padding-top: 5px;

    > p {
      color: #191919;
      font-family: ${(props) => props.primaryFont};
      margin: 0;
    }
  }

  > div:first-child {
    justify-content: flex-start;

    > p {
      font-weight: bold;
    }
  }

  > div:last-child {
    justify-content: flex-end;
  }
`;

export default MastheadItemsContainer;
