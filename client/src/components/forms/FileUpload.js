import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'



const FileUpload = () => {

    const {user} = useSelector((state) => ({...state}))

    const fileUploadAndResize = (e) => {
        console.log(e.target.files)

        //resize
        //let file = e.target.files[0] for a single  file
        let files = e.target.files

        if(files){
            for(let i = 0; i < files.length; i++)
            {
                Resizer.imageFileResizer(files[i], 720,720,'JPEG',100,0, (uri) => {
                    console.log(uri)
                },
                "base64")
            }
        }


        //send back to server to upload cloudinary

        //set url images[] in the []parent component - ProductCreate
    }

    return(
    <div className="row">
        <label className="btn btn-primary btn-raised">Choose File...
        <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />

        </label>
    </div>

    )

}

export default FileUpload