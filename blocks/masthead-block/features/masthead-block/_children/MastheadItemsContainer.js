import styled from "styled-components";

const MastheadItemsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;

	> div {
		align-items: flex-end;
		display: flex;
		flex: 1;
		padding-bottom: 9px;
		padding-top: 5px;
		justify-content: center;

		> p {
			color: #191919;
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
