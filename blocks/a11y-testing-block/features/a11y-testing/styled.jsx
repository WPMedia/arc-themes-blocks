import styled from 'styled-components';

export const AllyControl = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;

  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: center;
  position: fixed;
  width: 100px;
  z-index: 998 !important;

  &.topleft {
    left: 0;
    top: 0;
  }

  &.topright {
    right: 0;
    top: 0;
  }

  &.bottomleft {
    bottom: 0;
    left: 0;
  }

  &.bottomright {
    bottom: 0;
    right: 0;
  }

  img {
    height: auto;
    width: 55px;
  }

`;

export const AllyContainer = styled.div`
bottom: 0;
box-sizing: border-box;
display: flex;
flex-direction: column;
height: 100vh;
overflow-y: auto;
position: fixed;
right: -575px;
top: 0;
transition: all 1s ease;
width: 575px;
z-index: 999;

&.ally-panel-active {
  right: 0;
}

* {
  box-sizing: border-box;
}

.header {
  background-color: #d93025;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  opacity: 1;
  padding: 5px 10px;
  width: 100%;
}

.header:hover {
  opacity: 0.95;
}

.header .left {
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 30px;
  justify-content: flex-start;
}

.header h1 {
  align-items: center;
  color: #fff;
  display: flex;
  flex: 1;
  font-size: 16px;
  justify-content: left;
  text-align: left;
  text-transform: uppercase;
}

.header button.right {
  align-items: center;
  background-color: transparent;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 18px;
  justify-content: flex-end;
  text-align: right;
}

.alert {
  background: #f5f5f5;
  color: #f40;
  padding: 15px;
}

.alert h2 {
  font-size: 24px;
  line-height: 30px;
}

section.allyInnerContainer {
  align-items: center;
  background: #f5f5f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 0;
  width: 100%;
}

section.allyInnerContainer .reportContainer {
  padding: 15px;
  width: 100%;
}

section.allyInnerContainer .reportContainer  .report {
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px 10px 10px 30px;
  width: 99%;
}

section.allyInnerContainer .reportContainer  .report.critical {
  background-color: rgba(244, 215, 201, 0.37);
  border-left: 4px solid #d93025;
}

section.allyInnerContainer .reportContainer .report h2 {
  font-size: 22px;
  font-weight: 700;
}

section.allyInnerContainer .reportContainer .report.critical h2 {
  color: #d93025;
  display: inline;
}

section.allyInnerContainer .reportContainer .report.moderate {
  background-color: #fff5e6;
  border-left: 4px solid #ff9800;
}

section.allyInnerContainer .reportContainer .report.moderate h2 {
  color: #ff9800;
  display: inline;
}

section.allyInnerContainer .reportContainer .report a {
  display: block;
  margin-bottom: 5px;
  margin-top: 5px;
}

section.allyInnerContainer .reportContainer .report button {
  background-color: #46a1dc;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.428571429;
  margin-bottom: 15px;
  padding: 5px 15px;
  text-align: center;
}

section.allyInnerContainer .reportContainer .report button:hover {
  opacity: 0.8;
}

section.allyInnerContainer .reportContainer .report code {
  background: #fff;
  border-radius: 4px;
  font-family: Consolas,Monaco,'Andale Mono',monospace;
  font-size: 89%;
  font-weight: normal;
  opacity: 0.9;
  padding: 3px 5px;
}

section.allyInnerContainer .reportContainer .report ul {
  list-style-type: disc;
  padding: 0;
}

section.allyInnerContainer .reportContainer .report ul li {
  margin-left: 25px;
}

section.allyInnerContainer .reportContainer .report pre {
  overflow-y: scroll;
  width: 100%;
}

.a11yHighlight {
  border: 4px solid #f40;
}
`;
