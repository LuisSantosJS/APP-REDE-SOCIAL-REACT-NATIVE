import ImagePicker from 'react-native-image-crop-picker';

 function GetImage() {
    ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true
    }).then((image) => {
        console.log(image)
    })

}

export { GetImage };