
import React, { useRef, useState, useEffect, } from 'react';
import styled, { ThemeProvider, css, keyframes, } from "styled-components";

import { useMediaQuery } from 'react-responsive'




const Dropdown = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box; 
   


  ${function ({ toggle }) {

        return toggle ? css`
                        & > *:nth-child(1) {background-color: #3e8e41;}

                        & > *:nth-child(2) {
                          
                            z-index:10;
                            opacity:1;
                            height:${function ({ height }) { return height ? height : "auto" }};
                            transition: opacity 1s ,display 0s, height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)  ; 
                        }    
                    `
            : css`
                      & > *:nth-child(2) {
                      
                            height:0;
                            transition:  height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)  ; 
                        }
                    `


    }}
   
        

    & > *:nth-child(2) > a {
     
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
    }

    & > *:nth-child(2) > a:hover {
       
        background-color: #ddd;
        }



`
const DropBtn = styled.button`
 
  background-color: #4CAF50;
  color: white;
  padding: 6px 10px;
  font-size: 4rem;
  border: none;
  font-family:myFirstFont, sans-serif;

  /* @media (max-width: 1068px) {
       
  }   */
  @media (hover: none) { 
    font-size:4rem;
    }
  

`

const DropdownContent = styled.div`
  /* box-sizing: border-box;  */


  display:block;
  position: absolute;
  background-color: #f1f1f1;

  white-space: nowrap; 
 

  min-width:100%;

  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;


  height:${function ({ height }) { return height ? 0 : "auto" }};
  overflow:hidden;

  
  ${function ({ dropAlign }) {

        if (dropAlign == "right") {
            return css`margin-left:100%; transform:translateX(-100%);`;
        }
        if (dropAlign == "middle") {
            return css`margin-left:50%; transform:translateX(-50%);`;
        }


    }};
 transition: opacity 1s ,display 0s, height 0.1s  linear; 

`



const Menu = ({ title, children, ...props }) => {

    const btnRef = useRef();
    const contentRef = useRef();

    const [height, setHeight] = useState(null);

    const [dropAlign, setDropAlign] = useState("left")

    const isPhone = useMediaQuery({ query: '(hover: none)' });

    const [toggle, setToggle] = useState(true);


    useEffect(function () {




        //  if (!minWidth) {
        //   alert(btnRef.current.offsetWidth)
        //   setMinWidth(btnRef.current.offsetWidth + "px")

        //   };

        if (!height) { setHeight(contentRef.current.offsetHeight + "px") };

        setToggle(false)

    }, [height])

    useEffect(function () {



        //   let resizer = new ResizeObserver(function (e) {

        if (toggle) {

            // let len1 = btnRef.current.getBoundingClientRect().left + e[0].contentRect.width;

            // let len2 = btnRef.current.getBoundingClientRect().left - (e[0].contentRect.width * 0.5 - btnRef.current.offsetWidth * 0.5) + e[0].contentRect.width;

            // let len3 = btnRef.current.getBoundingClientRect().left + btnRef.current.offsetWidth;


            let len1 = btnRef.current.getBoundingClientRect().left + contentRef.current.offsetWidth;

            let len2 = btnRef.current.getBoundingClientRect().left - (contentRef.current.offsetWidth * 0.5 - btnRef.current.offsetWidth * 0.5) + contentRef.current.offsetWidth;

            let len3 = btnRef.current.getBoundingClientRect().left + btnRef.current.offsetWidth;



            let out1 = len1 > window.innerWidth;
            let out2 = len2 > window.innerWidth;
            let out3 = len3 > window.innerWidth;

            if (!out1 && dropAlign !== "left") { setDropAlign("left") }
            else if (out1 && !out2 && dropAlign !== "middle") { setDropAlign("middle") }
            else if (out1 && out2 && !out3 && dropAlign !== "right") { setDropAlign("right") }
            else if (out1 && out2 && out3) {

                // if( dropAlign!=="middle"){setDropAlign("middle")}

                let diff1 = Math.abs(len1 - window.innerWidth);
                let diff2 = Math.abs(len2 - window.innerWidth);
                let diff3 = Math.abs(len3 - window.innerWidth);


                if (Math.min(diff1, diff2, diff3) === diff1 && dropAlign !== "left") {
                    setDropAlign("left")
                }
                else if (Math.min(diff1, diff2, diff3) === diff2 && dropAlign !== "middle") {
                    setDropAlign("middle")
                }
                else if (Math.min(diff1, diff2, diff3) === diff3 && dropAlign !== "right") {
                    setDropAlign("right")
                }



            }
        }

        //    });
        //    resizer.observe(contentRef.current);

        //     return function () { return resizer };


    }, [dropAlign, toggle])


    return (
        <Dropdown height={height} toggle={toggle}

            onClick={
                function () { setToggle(!toggle) }
            }
            onMouseEnter={
                function () { !isPhone && setToggle(true) }
            }
            onMouseLeave={
                function () { !isPhone && setToggle(false) }
            }
        >
            <DropBtn ref={btnRef} >
                {title}
            </DropBtn>



            <DropdownContent ref={contentRef} height={height} dropAlign={dropAlign} >
                {children}

                {/* <RippleButon fullWidth={true}>7</RippleButon>
                <RippleButon fullWidth={true} >4</RippleButon> */}
            </DropdownContent>
        </Dropdown>


    );
}

export default Menu;