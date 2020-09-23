import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Platform,
    Dimensions,
    Image
} from 'react-native';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import ViewShot from "react-native-view-shot";
import { useUriImage, useUriImageSmall, useUriImageAspectRatio } from '../../context/contextCamera';
import { useUserID, useUserSaved } from '../../context/contextMain';
import { useNavigation } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import { RNCamera, FaceDetector, Face, TakePictureOptions } from 'react-native-camera';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from '../../assets/icons/icons';



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface BOXFACE {
    width: number,
    height: number,
    x: number,
    y: number,

}
const CameraScreen: React.FC = () => {
    const navigation = useNavigation();
    const { userID } = useUserID();
    const [modeType, setModeType] = useState(RNCamera.Constants.Type.back);
    const [pressCamera, setPressCamera] = useState<boolean>(false);
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
    const [boxDetector, setBoxDetector] = useState<BOXFACE>();
    const [visibleBoxDetector, setVisibleBoxDetector] = useState<boolean>(false);
    const { uri, setUri } = useUriImage();
    const viewShotRef = createRef<any>();
    const { uriSmall, setUriSmall } = useUriImageSmall();
    const { aspectRatio, setAspectRatio } = useUriImageAspectRatio();

    useEffect(() => { }, [modeType])

    const AlterModeType = () => {
        if (modeType == RNCamera.Constants.Type.back) {
            setModeType(RNCamera.Constants.Type.front)
        } else {
            setModeType(RNCamera.Constants.Type.back)
        }
    }

    const AlterModeFlash = () => {
        if (flash == RNCamera.Constants.FlashMode.torch) {
            setFlash(RNCamera.Constants.FlashMode.off)
        } else {
            setFlash(RNCamera.Constants.FlashMode.torch)
        }
    }
    const handlePressCamera = () => {
        if (userID == 0) {
            Toast.showWithGravity('Você precisa se cadastrar', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth');
        }
        setPressCamera(true);
        takePicture();
    }
    const handleOutPressCamera = () => {
        setPressCamera(false);
    }

    const onFaceDetected = (faces: Face[]) => {

        // if (faces[0]) {
        //     setVisibleBoxDetector(true)
        //     console.log('CARA')
        //     const BOX: BOXFACE = {
        //         width: faces[0].bounds.size.width,
        //         height: faces[0].bounds.size.height,
        //         x: faces[0].bounds.origin.x,
        //         y: faces[0].bounds.origin.y,
        //     }
        //     setBoxDetector(BOX)
        // } else {

        // }

    };


    const getAvatar = async () => {
        if (userID == 0) {
            Toast.showWithGravity('Você precisa se cadastrar', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth');
        }

        try {
            await ImagePicker.requestCameraPermissionsAsync();
            await ImagePicker.requestCameraRollPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                allowsMultipleSelection: false,
                quality: 1,
            });
            if (!result.cancelled) {
                const ARATIO: number = Number(result.width / result.height);
                setAspectRatio(ARATIO);
                setUri(result.uri);
                resizeImage(result.uri);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    }

    async function takePicture() {
        var photo = await viewShotRef.current.capture();
        console.log(photo)
        Image.getSize(photo, (w, h) => {
            const ARATIO: number = Number(w / h);
            setAspectRatio(ARATIO);
            setUri(photo);
            ImageResizer.createResizedImage(photo, 40, 40, 'JPEG', 100)
                .then(res => {
                    console.log('peguei a imagem');
                    console.log('resize', res.uri)
                    setUriSmall(res.uri);
                    navigation.navigate('PostPublish')
                })
                .catch(err => {
                    console.log('erro', err);
                    return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
                });
        })
    };

    function resizeImage(response: string) {
        ImageResizer.createResizedImage(response, 40, 40, 'JPEG', 100)
            .then(res => {
                console.log('peguei a imagem');
                console.log('resize', res.uri)
                setUriSmall(res.uri);
                navigation.navigate('PostPublish')
            })
            .catch(err => {
                console.log('erro', err);
                return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            });
    }

    return (
        <View style={styles.container}>
            <ViewShot
                ref={viewShotRef} style={{ flex: 1 }} >
                <RNCamera
                    style={{ flex: 1 }}
                    type={modeType}
                    flashMode={flash}
                    onFacesDetected={(e) => onFaceDetected(e.faces)}
                    onFaceDetectionError={() => setVisibleBoxDetector(false)}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                //     //console.log(barcodes);
                // }}

                />
            </ViewShot>
            {/* {visibleBoxDetector &&
                <View style={{ top: boxDetector?.y, left: boxDetector?.x, height: boxDetector?.height, width: boxDetector?.width, position: 'absolute', borderWidth: width * 0.004, borderColor: 'white' }} />
            } */}





            <TouchableOpacity onPress={AlterModeFlash} style={styles.viewFlashIcon}>
                <Icon.Ionicons name={flash == RNCamera.Constants.FlashMode.torch ? "flash" : "flash-off"} color="white" size={width * 0.08} />
            </TouchableOpacity>

            <Grid style={styles.gridContainerButtons}>

                <Col style={[styles.colGridItem]}>
                    <TouchableOpacity onPress={getAvatar} style={styles.alginTouchIcon}>
                        <Icon.Fontisto name="photograph" color="white" size={width * 0.07} />
                    </TouchableOpacity>
                </Col>

                <Col style={[styles.colGridItem]}>
                    <View onTouchStart={handlePressCamera} onTouchEnd={handleOutPressCamera} style={pressCamera ? styles.iconPressCameraRec : {}}>
                        <View style={styles.iconPressCamera}>
                            <View style={pressCamera ? styles.iconPressCameraDentro : {}} />
                        </View>
                    </View>
                </Col>

                <Col style={[styles.colGridItem]}>
                    <TouchableOpacity onPress={AlterModeType} style={styles.alginTouchIcon}>
                        <Icon.Ionicons name={"camera-reverse"} color="white" size={width * 0.08} />
                    </TouchableOpacity>
                </Col>

            </Grid>

        </View>
    );

};
export default CameraScreen;