
import React, { useRef, useState, useEffect, } from 'react';
import styled, { ThemeProvider, css, keyframes, } from "styled-components";
import axios from "axios";
import url from "../config";


const Wrapper = styled.div`
    width: 100%;
    /* min-height: 800px;*/
    /* position: absolute;*/
    margin-top:50px;
    margin-bottom:50px; 
    display: flex;
  
    justify-content:center;
  
`




const ProgressbarWrapper = styled.div`
    width: 300px;
    height: 60px;
    /* top: 50%; */
    /* left: 50%; */
    /* position: absolute; */
    /* transform: translate(-50%, -50%);  */
 
`
const Progressbar = styled.div`
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(-20deg) rotateY(-30deg);
`



const SideDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(254, 254, 254, 0.3);
    top: 0;
    left: 0;
    position: absolute;
`

const Front = styled(SideDiv)`

`

const Bottom = styled(SideDiv)`
    box-shadow: 10px 10px 50px 5px rgba(90, 90, 90, 0.7);
    transform: rotateX(90deg);
    transform-origin: bottom;
`

const Top = styled(SideDiv)`
    transform: translate(0, -100%) rotateX(90deg);
    transform-origin: bottom;
`
const Back = styled(SideDiv)`
    transform: translateZ(-60px);
`
const Left = styled(SideDiv)`
    width: 60px;
    transform: rotateY(90deg);
    transform-origin: left;
    background-color: rgba(225, 0, 120, 0.6);
`
const Bar = styled.div`
    height:100%;
    background-color: rgba(225, 0, 120, 0.6);
    box-shadow: 5px 5px 50px 5px rgba(225, 0, 120, 0.3);
    width:${function ({ progress }) { return progress }};

    transition: width 1s ease;
`










const ProgressBar = ({ progress = "0%" }) => {
    return (
        <Wrapper>
            <ProgressbarWrapper>
                <Progressbar>
                    <Front>
                        <Bar progress={progress} />
                    </Front>
                    <Back>
                        <Bar progress={progress} />
                    </Back>
                    <Top>
                        <Bar progress={progress} />
                    </Top>
                    <Bottom>
                        <Bar progress={progress} />
                    </Bottom>
                    <Left>

                    </Left>
                </Progressbar>
            </ProgressbarWrapper>
        </Wrapper>

    );
}

export default ProgressBar;