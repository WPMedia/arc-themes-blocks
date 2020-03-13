import styled from 'styled-components';
import rem from 'polished/lib/helpers/rem';

const MastheadItemsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  > div {
    flex: 1;
    display: flex;
    align-items: flex-end;
    padding-bottom: 9px;
    padding-top: 5px;

    > p {
      font-size: ${rem('14px')};
      line-height: ${rem('16px')};
      font-family: ${(props) => props.primaryFont};
      margin: 0;
      color: #191919;
    }
  }

  > div {
    justify-content: center;
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
