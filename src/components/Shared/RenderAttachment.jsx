import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

const RenderAttachment = (file, url) => {
  switch(file){
    case "Video":
        return <Video src={url} preload="none" width={"200px"} controls />
    
    case "Image":
        return <img src={transformImage(url,200)} alt='Attachment' width={"200px"} height={'150px'} 
                style={{objectFit: "contain"}}/>
       
    case "Video":
        return <Audio src={url} preload="none" controls />
        
    default:
        return <FileOpenIcon />
       
  }
}

export default RenderAttachment