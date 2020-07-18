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

    const [refresh, setRefresh] = useState(0);
    const show = useRef(true)
    const [isWrap, setIsWrap] = useState(false);
    const barRef = useRef();
    const height = useRef(0);

    useEffect(function () {


        if (!isWrap) {
            height.current = barRef.current.offsetHeight;
            setIsWrap(true);
        }
        else {
            if (barRef.current.offsetHeight > height.current) {
                show.current = false;
                setRefresh(pre => pre + 1)
            }
        }

    }, [isWrap]);

    useEffect(function () {
        let resizer = new ResizeObserver(function (e) {

            if (show.current && barRef.current.offsetHeight > height.current) {
                show.current = false;
                setRefresh(pre => pre + 1);

            }
            else if (!show.current && barRef.current.offsetHeight <= height.current) {
                show.current = true;
                setRefresh(pre => pre + 1)
            }
        });
        resizer.observe(barRef.current);
    }, [])




    return (
        <>
            {show.current
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

            <Div isWrap={isWrap} ref={barRef} style={{ position: "fixed", opacity: "0" }}>
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