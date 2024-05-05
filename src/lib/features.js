import moment from "moment";

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

const getLastSevenDays = ()=>{
    const currDate = moment();

    const lastSevenDays = [];

    for (let i = 0; i < 7; i++ ){
        // lastSevenDays.push(currDate.format("MMM D"));//this will give month and date
        // currDate.subtract(1, "days");
        const dayDate = currDate.clone().subtract(i,"days");
        const dayName = dayDate.format("dddd");
        lastSevenDays.push(dayName)
    }
    return lastSevenDays.reverse(); // or we can also do lastSevenDays.unshift(currDate.format("MMM D")) then we don't need to use reverse
}

export {fileFormat,transformImage,getLastSevenDays}