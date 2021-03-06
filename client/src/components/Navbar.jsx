import React, { useRef, useState, useEffect, } from 'react';
import styled, { ThemeProvider, css, keyframes, } from "styled-components";

import Menu from "./Menu";


const Div = styled.div`
    display:flex;
    justify-content:flex-end;
    background-color:pink;
    font-size:4rem;

   flex-wrap:${function ({ isWrap }) { return isWrap ? "wrap" : "nowrap" }}; 
`


const Div2 = styled.div`
    display:flex;
    align-items:flex-end;
    flex-direction:column;
    background-color:pink;
    font-size:4rem;

   
`


const Navbar = () => {


    const [show, setShow] = useState(true);
    const [isWrap, setIsWrap] = useState(false);
    const barRef = useRef();
    const height = useRef(0);




    useEffect(function () {

        height.current = barRef.current.offsetHeight;
        setIsWrap(true);
   
// access  show   here may not be accurte, use ref instead of state if really need to.
// access show via setshow( pre )
        let resizer = new ResizeObserver(function (e) {

            barRef.current.offsetHeight > height.current
                ? (function () {
                 //   console.log(show);
                    setShow(pre => {
                 //       console.log(pre);
                        return false
                    })
                }())
                : (function () {
                  //   console.log(show);
                    setShow(pre => {
                  //      console.log(pre);
                        return true
                    })
                }())


        }); resizer.observe(barRef.current);


        return function () {
            resizer.disconnect();
            return resizer;
        }

    }, [])




    return (
        <>
<div>{show+""}</div>


            {show
                ? <Div >
                    <Menu title="Home">
                        <a>aaa</a>
                        <a>bbb</a>
                        <a>ccc</a>
                    </Menu>

                    <Menu title="Contact">
                        <a>ddd</a>
                        <a>eee</a>
                        <a>fff</a>
                    </Menu>


                    <Menu title="About">
                        <a>ggg</a>
                        <a>hhh</a>
                        <a>iii</a>
                    </Menu>

                    <Menu title="Profile">
                        <a>jjj</a>
                        <a>kkk</a>
                        <a>lll</a>
                    </Menu>


                </Div>
                :
                <Div2>
                    <Menu title="shrinked">
                        <a>aaa aaaa aaaa</a>
                        <a>bbb</a>
                        <a>ccc</a>
                        <a>ddd</a>
                        <a>eee</a>
                        <a>fff</a>
                    </Menu>
                </Div2>}

            <Div isWrap={isWrap} ref={barRef} style={{ zIndex: "-100", width: "100%", position: "fixed", opacity: "0.8" }}>
                <Menu title="Home">
                    <a>aaa</a>
                    <a>bbb</a>
                    <a>ccc</a>
                </Menu>
                <Menu title="Contact">
                    <a>ddd</a>
                    <a>eee</a>
                    <a>fff</a>
                </Menu>
                <Menu title="About">
                    <a>ggg</a>
                    <a>hhh</a>
                    <a>iii</a>
                </Menu>
                <Menu title="Profile">
                    <a>jjj</a>
                    <a>kkk</a>
                    <a>lll</a>
                </Menu>
            </Div>

        </>
    );
}

export default Navbar;