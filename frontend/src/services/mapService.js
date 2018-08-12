import axios from 'axios'
const API_KEY= 'AIzaSyDoi7G5B3YG0m2gZ_mxK_uTd7OmkRYvaWE'

function getAddress(location) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`)
        .then(res=>{
            return res.data.results[0].formatted_address
        })
}

export default {
    getAddress
}