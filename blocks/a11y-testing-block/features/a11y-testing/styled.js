/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';


export const AllyControl = styled.button`
    width:100px;
    height: 60px;
    position: fixed;
    z-index:998 !important;
    background-color: transparent;
    display:flex;
    justify-content:center;
    align-items: center;
    border: 0;
    
    cursor: pointer;
    
    &.topleft {
        top:0;
        left:0;
    }
    
    &.topright {
        top:0;
        right:0;    
    }
    
    &.bottomleft {
        bottom:0;
        left:0;    
    }
    
    &.bottomright {
        bottom:0;
        right:0;     
    }        
    
    img {
        width: 55px;
        height:auto;
    }

`;

export const AllyContainer = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    right: -575px;
    width: 575px;
    height: 100vh;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    transition: all 1s ease;
    
    &.ally-panel-active {
        right: 0;
    }
    
    * {
        box-sizing: border-box;
    }
    
   .header {
        width: 100%;
        padding: 5px 10px;
        color: white;
        background-color: #d93025;
        opacity: 1;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        display: flex;
    }

    .header:hover {
        opacity: .95;
    }

    .header .left {
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        font-size: 30px;
        display: flex;
    }

    .header h1 {
        flex: 1;
        justify-content: left;
        align-items: center;
        text-align: left;
        font-size: 16px;
        display: flex;
        text-transform: uppercase;
        color:white;
    }

    .header button.right {
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        font-size: 18px;
        display: flex;
        color:white;
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
    
    .alert {
        color: red;
        padding: 15px;
        background: #F5F5F5
    }
    
    .alert h2 {
        font-size: 24px;
        line-height: 30px;
    }

    section.allyInnerContainer {
        box-sizing: border-box;
        background: #F5F5F5;
        padding: 0;
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%
    }
    
    section.allyInnerContainer .reportContainer {
        width: 100%;
        padding: 15px;
    }

    section.allyInnerContainer .reportContainer  .report {
        padding: 10px 10px 10px 30px;
        margin-bottom: 10px;
        margin-top: 10px;
        width: 99%;
        border-radius: 4px;
    }

    section.allyInnerContainer .reportContainer  .report.critical {
        background-color: rgba(244, 215, 201, .37);
        border-left: 4px solid #d93025;
    }
    
    section.allyInnerContainer .reportContainer .report h2 {
        font-size: 22px;
        font-weight: 700;
    }

    section.allyInnerContainer .reportContainer .report.critical h2{
        display: inline;
        color: #d93025;
    }

    section.allyInnerContainer .reportContainer .report.moderate {
        background-color: #fff5e6;
        border-left: 4px solid #ff9800;
    }

    section.allyInnerContainer .reportContainer .report.moderate h2{
        display: inline;
        color: #ff9800;;
    }

    section.allyInnerContainer .reportContainer .report a{
        display: block;
        margin-top:5px;
        margin-bottom: 5px;
    }

    section.allyInnerContainer .reportContainer .report button{
        background-color: #46A1DC;
        color: #fff;
        padding: 5px 15px;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.428571429;
        text-align: center;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 5px;
        margin-bottom: 15px;
    }
    section.allyInnerContainer .reportContainer .report button:hover{
        opacity: .80;
    }

    section.allyInnerContainer .reportContainer .report code{
        background: #fff;
        opacity: 0.9;
        padding: 3px 5px;
        border-radius: 4px;
        font-family: Consolas,Monaco,'Andale Mono',monospace;
        font-size: 89%;
        font-weight: normal;
    }

    section.allyInnerContainer .reportContainer .report ul {
        list-style-type: disc;
        padding: 0;
    }

    section.allyInnerContainer .reportContainer .report ul li {
        margin-left: 25px;
    }
    
    section.allyInnerContainer .reportContainer .report pre{
        width: 100%;
        overflow-y: scroll;
    }
    
    .a11yHighlight {
        border: 4px solid red;
    }        
`;
