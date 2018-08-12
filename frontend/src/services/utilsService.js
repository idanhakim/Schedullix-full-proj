import axios from 'axios'

function doUploadImg(elImg) {
    const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/schedullix/image/upload'
    const UPLOAD_PRESET = 'ujkpuj2z'
    var formData = new FormData()
    formData.append('file', elImg)
    formData.append('upload_preset', UPLOAD_PRESET)

    return axios.post(UPLOAD_URL, formData)
        .then(res => {
            return res.data.url
        })
}

export default {
    doUploadImg
}