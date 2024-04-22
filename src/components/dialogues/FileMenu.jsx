import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorE1}) => {
  return (
    <Menu anchorE1={anchorE1} open={false} >
        <div style={{width:"10rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         A diam sollicitudin tempor id eu nisl. Turpis in eu mi bibendum neque egestas.</div>
    </Menu>
  )
}

export default FileMenu;