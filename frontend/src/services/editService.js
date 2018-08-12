export default {
    onInputFile
}

function onInputFile(reader, file) {
    var image;
    reader.onloadend = () => {
        image = reader.result
    }
    if (file) {
        reader.readAsDataURL(file)
        return image
    } else return ''
}