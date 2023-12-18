import React from 'react'
import axios from 'axios'

const PostImage = (props) => {

    const FileUpload = (e) => {
        // console.log(e.target.files);
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));
        // for (const keyValue of formData) console.log(keyValue)

        axios
            .post("/api/post/image/upload", formData)
            .then((response) => {
                console.log(response);
                props.setImage(response.data.filePath);
            })
    }

    return (
        <div>
            <input
                type="file"
                accept='image/*'
                onChange={(e) => FileUpload(e)}
            />
        </div>
    )
}

export default PostImage