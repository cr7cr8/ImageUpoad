
import React, { useRef, useState, useEffect, } from 'react';
import styled, { ThemeProvider, css, keyframes, } from "styled-components";


const Div = styled.div`
    box-sizing: border-box;
    margin: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    background: #ecf0f3;

`


const LoginDiv = styled.div`
    width: 430px;
    height: 700px;
    padding: 60px 35px 35px 35px;
    border-radius: 40px;
    background: #ecf0f3;
    box-shadow: 13px 13px 20px #cbced1,-13px -13px 20px #ffffff;
`
const Logo = styled.div`
    background: url("https://mernchen.herokuapp.com/api/picture/download/5eede3496311a60017ef69a0");
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    box-shadow:
    /* logo shadow */
    0px 0px 2px #5f5f5f,
    /* offset */
    0px 0px 0px 5px #ecf0f3,
    /*bottom right */
    8px 8px 15px #a7aaaf,
    /* top left */
    -8px -8px 15px #ffffff;
`
const Title = styled.div`
    text-align: center;
    font-size: 28px;
    padding-top: 24px;
    letter-spacing: 0.5px;
`
const SubTitle = styled.div`
    text-align: center;
    font-size: 15px;
    padding-top: 7px;
    letter-spacing: 3px;
`
const InputText = styled.input.attrs((props) => ({type: "text"}))`
        border: none;
        outline: none;
        background: none;
        font-size: 18px;
        color: #555;
        padding: 20px 10px 20px 5px;

`

const InputPassword = styled.input.attrs((props) => ({type: "password"}))`
        border: none;
        outline: none;
        background: none;
        font-size: 18px;
        color: #555;
        padding: 20px 10px 20px 5px;

`

const Fileds = styled.div` 
    width: 100%;
    padding: 75px 5px 5px 5px;

    & input[type=text] {
        border: none;
        outline: none;
        background: none;
        font-size: 18px;
        color: #555;
        padding: 20px 10px 20px 5px;
       
    }

    & > div>input[type=password] {
        border: none;
        outline: none;
        background: none;
        font-size: 18px;
        color: #555;
        padding: 20px 10px 20px 5px;
  
  
    }



    & .username{
        /* margin-bottom: 30px;*/
        border-radius: 25px; 
        box-shadow: inset 8px 8px 8px #cbced1,inset -8px -8px 8px #ffffff;
    }
    & .password{
        
      
        border-radius: 25px;
        box-shadow: inset 8px 8px 8px #cbced1,inset -8px -8px 8px #ffffff;
    }



    & svg{
        height: 22px;
        margin: 0 10px -3px 25px;
    }
`



const SigninButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 60px;
    border-radius: 30px;
    font-size: 20px;
    font-weight: 700;

    color: #fff;
    text-align: center;
    background: #24cfaa;
    box-shadow: 3px 3px 8px #b1b1b1,
                -3px -3px 8px #ffffff;
    transition: 0.5s;

    &:hover {
        background: #2fdbb6;
    }

    &:active{
        background: #1da88a;
    }

`


const Link_ = styled.div` 
    padding-top: 20px;
    text-align: center;

    & a{
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
    }
`







const Neomo = () => {
    return (
        <Div>
            <LoginDiv>
                <Logo></Logo>
                <Title>Login</Title>
                <SubTitle>lll</SubTitle>
                <Fileds>
                    <div className="username">
                        <svg fill="#999" viewBox="0 0 1024 1024"><path class="path1" d="M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z"></path>
                        </svg>
                    
                    <input type="text"   placeholder="username" />
                    
                   
                    </div>

                    <div style={{width:"100%",margin:"30px 0px"}}></div>

                    <div className="password">
                        <svg fill="#999" viewBox="0 0 1024 1024"><path class="path1" d="M742.4 409.6h-25.6v-76.8c0-127.043-103.357-230.4-230.4-230.4s-230.4 103.357-230.4 230.4v76.8h-25.6c-42.347 0-76.8 34.453-76.8 76.8v409.6c0 42.347 34.453 76.8 76.8 76.8h512c42.347 0 76.8-34.453 76.8-76.8v-409.6c0-42.347-34.453-76.8-76.8-76.8zM307.2 332.8c0-98.811 80.389-179.2 179.2-179.2s179.2 80.389 179.2 179.2v76.8h-358.4v-76.8zM768 896c0 14.115-11.485 25.6-25.6 25.6h-512c-14.115 0-25.6-11.485-25.6-25.6v-409.6c0-14.115 11.485-25.6 25.6-25.6h512c14.115 0 25.6 11.485 25.6 25.6v409.6z"></path>
                        </svg>
                 
                    <input type="password"  placeholder="password" />
                   
                    </div>
                </Fileds>
                <div style={{width:"100%",margin:"20px 0px"}}></div>
                <SigninButton>Login</SigninButton>
                <Link_>
                    <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
                </Link_>
            </LoginDiv>
        </Div>
    );
}

export default Neomo;


