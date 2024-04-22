
const fileFormat = (url="")=>{
    const fileExtension = url.split(".").pop();
    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg"){
        return "Video";
    }
    if (fileExtension === "mp3" || fileExtension === "wav" ){
        return "Audio";
    }
    if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif"){
        return "Image";
    }
    return "File";
}   

const transformImage = (url="",width=100)=>url

export {fileFormat,transformImage}