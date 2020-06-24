
import React, { useRef, useState, useEffect, } from 'react';
import styled, { ThemeProvider, css, keyframes, } from "styled-components";
import axios from "axios";
import url from "../config";


import ProgressBar from "./ProgressBar";

const Input = styled.input.attrs((props) => ({

    type: "file"


}))`
display:block;

`

function deleteFile(fileId, setFileList) {

    axios.get(`${url}/picture/delete/${String(fileId)}`)
        .then(function ({ data }) {

            setFileList(pre => {

                return pre.filter(function (e) { if (e.fileId !== fileId) { return e } })

            })
        })
        .catch(err => { console.log(err) })
}



function uploadFile(pic, setPic, fileList, setFileList, setPercentage, setProgress) {


    const data = new FormData();
    data.append('file', pic);
   // data.append('file', pic);

    data.append('obj',
        JSON.stringify({
            filename: pic.name.trim(),
            uploadTime: Date.now(),

        })
    );

    //alert(`${url}/picture/upload`)

    return axios.post(`${url}/picture/upload`, data, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            
            console.log(percentCompleted);
            setProgress(percentCompleted+"%");

            percentCompleted === 100
                ? setPercentage("Finished")
                : setPercentage(percentCompleted + "%")


        },
    })
        .then(
            ({ data }) => {
                const { fileList: list } = data;

                setPic(null)
                setProgress("0%");
                setPercentage("Upload");

                setFileList(pre => {

                    return [...list,...pre, ];
                })
            }
        )
        .catch(err => { console.log(err) })

}






const InputFile = () => {

    const inputRef = useRef();

    const [pic, setPic] = useState(null);

    const [fileList, setFileList] = useState([]);

    const [percentage, setPercentage] = useState("Upload");
    const [progress, setProgress] = useState("0%");

    useEffect(function () {

        axios.get(`${url}/picture/list`)
            .then(({ data }) => {
                //  console.log(data);

                const { fileList: list } = data;
                console.log(list)
                console.log(setFileList(list.reverse()))

            })
            .catch(err => {
                console.log(err)
            })



    }, [])



    return (

        <div style=
            {{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                overflow:"auto",
                position: "relative",
                // top: "-150px",
                // left: "-150px",
                backgroundColor: "#eee",

                boxSizing: "border-box",
                width: "100%",
          //      height: "100vh"
            }}
        >

            <input type="file" style={{ marginBottom: "10px", width: "100%", display: "none" }} ref={inputRef}

                onClick={function (e) {
                    e.currentTarget.value = null;
                }}

                onChange={function (e) {
                    // alert((e.currentTarget.files[0].name).trim());
                    e.currentTarget.files[0].name.trim().match(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
                        ? setPic(e.currentTarget.files[0])
                        : setPic(null);
                }}
            />


            <button
                style={{ marginBottom: "10px", fontSize:"2rem"}}
                onClick={function (e) {
                    setPic(null)
                    inputRef.current.click()
                }}
            >
                pick a image
            </button>

            <ProgressBar progress={progress}/>

            {pic && <div style={{ marginBottom: "10px" }}>{pic.name}</div>}

            {pic && <img src={pic ? URL.createObjectURL(pic) : ""} width="100px" />}


            <button style={{ marginTop: "10px", fontSize:"2rem" }}

                disabled={percentage!=="Upload"}
                onClick={function (e) {
                    pic
                        ? uploadFile(pic, setPic, fileList, setFileList, setPercentage,setProgress)
                        : alert("no pic is selected")
                }}>
                {percentage}
            </button>


            <div style={{ margin: "10px", backgroundColor: "pink" }}> </div>

            {fileList.map(function (item, index) {

                return (
                    <div key={index} style={{ display: "flex", width: "30%", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <a
                            target="_blank"
                            style={{ margin: "10px",fontSize:"2rem" }}
                            href={`${url}/picture/download/${item.fileId}`}
                        >
                            {item.fileName}
                        <img src={`${url}/picture/downloadsmall/${item.fileId}`}/>
                        </a>
                        <button
                            style={{
                                fontSize:"2rem"
                            }}
                            onClick={
                                function (e) {
                                    deleteFile(item.fileId, setFileList)
                                }
                            }

                        >delete</button>
                    </div>


                )
            })}

        </div>



    );
}

export default InputFile;
