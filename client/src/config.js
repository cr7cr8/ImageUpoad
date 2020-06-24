


let url=""

if(process.env.NODE_ENV === "development"){

    url="http://localhost/api"
}
else{
    url="/api"

}









export default url;