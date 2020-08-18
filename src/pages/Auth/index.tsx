import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import styles from './styles';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import { Permissions } from 'react-native-unimodules';
import Toast from 'react-native-simple-toast';
import { TextInput } from 'react-native-gesture-handler';
import * as EmailValidator from 'email-validator';
import { useUserSaved, useUserAvatar, useUserEmail, useUserName, useUserID } from '../../context/contextMain';
import AsyncStorage from '@react-native-community/async-storage';

interface USER {
    avatar: string;
    email: string;
    id: number;
    name: string
}


const Auth: React.FC = () => {
    const navigation = useNavigation();
    const { userSaved, setUserSaved } = useUserSaved();
    const { userAvatar, setUserAvatar } = useUserAvatar();
    const { userEmail, setUserEmail } = useUserEmail();
    const { userName, setUserName } = useUserName();
    const { userID, setUserID } = useUserID();
    const [inputName, setInputName] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');
    const [getUserAvatar, setGetUserAvatar] = useState<string>('');
    const [selectAvatar, setSelectAvatar] = useState<boolean>(false);
    const [isCode, setIsCode] = useState<boolean>(false);
    const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false);
    const [codeHash, setCodeHash] = useState<string>('');
    const [loadingCreateUser, setLoadingCreateUser] = useState<boolean>(false);
    const [loadingSendEmail, setLoadingSendEmail] = useState<boolean>(false);
    const [visiblePickerPhoto, setVisiblePickerPhoto] = useState<boolean>(true);
    function keyboarDidShow() {
        setVisiblePickerPhoto(false)
        return true;
    }
    function keyboarDidHide() {
        setVisiblePickerPhoto(true)
        return true;
    }
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboarDidShow)
        Keyboard.addListener('keyboardDidHide', keyboarDidHide)
        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboarDidShow)
            Keyboard.removeListener('keyboardDidHide', keyboarDidHide)
        }
    }, [])




    useEffect(() => {

    }, [isCode, loadingCreateUser, loadingSendEmail, visiblePickerPhoto]);

    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const uploadImage = () => {
        if (loadingCreateUser) {
            return;
        }

        if (!selectAvatar) {
            return Toast.showWithGravity('Insira uma foto de perfil!', Toast.LONG, Toast.TOP);
        }

        setLoadingCreateUser(true);
        console.log('upando imagem');
        api.post('/validate', {
            code: inputCode.toLowerCase(),
            hash: codeHash
        }).then(resposne => {
            if (resposne.data.value == false) {
                setLoadingCreateUser(false);
                return Toast.showWithGravity('Código inválido!', Toast.LONG, Toast.TOP);
                
            }
            storage().ref(`Profile/${inputEmail.toLowerCase()}`).putFile(`${getUserAvatar}`).then(() => {
                console.log('upload bem sucedido');
                storage().ref(`Profile/${inputEmail.toLowerCase()}`).getDownloadURL().then(res => {
                    return createUser(res);
                }).catch((res) => {
                    setLoadingCreateUser(false);
                    console.log(res)
                    Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
                })
            }).catch(() => {
                setLoadingCreateUser(false);
                Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            })
            setLoadingUploadImage(false)

        })
    }
    const getAvatar = async () => {
        setLoadingUploadImage(true)
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.cancelled) {

                resizeImage(result.uri);

            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
        setLoadingUploadImage(false)
    }

    function resizeImage(response: string) {
        ImageResizer.createResizedImage(response, 400, 400, 'JPEG', 100)
            .then(res => {
                console.log('peguei a imagem');
                setGetUserAvatar(res.uri);
                setSelectAvatar(true);
                // return uploadImage(res.uri);
            })
            .catch(err => {
                console.log('erro', err);
                return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            });
    }
    const handleSendEmail = () => {
        if (loadingSendEmail) {
            return;
        }
        setLoadingSendEmail(true);
        const validEmail = EmailValidator.validate(`${inputEmail}`);
        if (!validEmail) {
            setLoadingSendEmail(false)
            return Toast.showWithGravity('Insira um email válido!', Toast.LONG, Toast.TOP);
        }
        if (inputName.length === 0) {
            return Toast.showWithGravity('Insira seu nome!', Toast.LONG, Toast.TOP);
        }
        if (!selectAvatar) {
            Toast.showWithGravity('Insira uma foto de perfil!', Toast.LONG, Toast.TOP);
        }
        api.post('/users/send_email', {
            email: inputEmail
        }).then(res => {
            if (res.data.error == true) {
                setLoadingSendEmail(false)
                console.log(res.data)
                return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            }
            setCodeHash(String(res.data.code));
        }).catch((res) => {
            setLoadingSendEmail(false)
            console.log(res)
            return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
        })
        setIsCode(true);
        setLoadingSendEmail(false)
        return Toast.showWithGravity('Verifique seu email!', Toast.LONG, Toast.TOP);
    }


    const createUser = (avatarImage: string) => {

        const DATA = {
            code: String(inputCode.toLowerCase()),
            hash: String(codeHash),
            email: String(inputEmail.toLowerCase()),
            name: String(inputName),
            avatar: String(avatarImage)
        };
        api.post('/user/create', DATA).then(res => {
            if (res.data.message === 'error') {
                setInputCode('');
                return Toast.showWithGravity('Código inválido!', Toast.LONG, Toast.TOP);
            }
            const data: USER = res.data.res[0];

            console.log(res.data.res[0]);
            saveUser(data);
        }).catch((res) => {
            console.log(res)
            Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
        });
        setLoadingCreateUser(false);
    }

    const resetConfirmAndReSendEmail = () => {
        setCodeHash('');
        setIsCode(false);
        setInputEmail('');
        setInputCode('');
        setLoadingCreateUser(false);
        setLoadingSendEmail(false);

    }
    const saveUser = async (value: USER) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_data', jsonValue)
        } catch (e) {
            Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
        }
        return finishUser(value);

    }
    const finishUser = async (value: USER) => {
        setUserAvatar(value.avatar);
        setUserEmail(value.email);
        setUserName(value.name);
        setUserID(value.id);
        setUserSaved(true);
        return navigation.goBack();
    }

    if (isCode) {
        return (
            <View style={styles.container}>
                <View style={styles.containerItemsView}>
                    {visiblePickerPhoto &&
                        <TouchableWithoutFeedback onPress={getAvatar}>
                            <Image source={selectAvatar ? { uri: getUserAvatar } : require('../../assets/sem_foto_perfil.png')} style={styles.viewProfile} />
                        </TouchableWithoutFeedback>}
                    {loadingUploadImage && <ActivityIndicator size={'small'} color={'white'} />}
                    <View style={[styles.containerViewInputs, { height: visiblePickerPhoto ? '35%' : Platform.OS == 'android' ? '65%' : '40%' }]}>
                        <TextInput
                            placeholder={"Insira o código!"}
                            style={styles.input}
                            value={inputCode}
                            onChangeText={(res) => setInputCode(res)}
                        />
                        <TouchableOpacity onPress={uploadImage} style={styles.submit}>
                            {loadingCreateUser ?
                                <ActivityIndicator size='large' color={'white'} /> :
                                <Text style={styles.textSubmit}>Confirmar</Text>}
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity onPress={resetConfirmAndReSendEmail}><Text style={styles.textRee}>Quero escolher outro email...</Text></TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.containerItemsView}>
                    {visiblePickerPhoto &&
                        <TouchableWithoutFeedback onPress={getAvatar}>
                            <Image source={selectAvatar ? { uri: getUserAvatar } : require('../../assets/sem_foto_perfil.png')} style={styles.viewProfile} />
                        </TouchableWithoutFeedback>}
                    {loadingUploadImage && <ActivityIndicator size={'small'} color={'white'} />}
                    <View style={[styles.containerViewInputs, { height: visiblePickerPhoto ? '35%' : Platform.OS == 'android' ? '65%' : '40%' }]}>
                        <TextInput
                            placeholder={"Insira seu nome!"}
                            style={styles.input}
                            maxLength={15}
                            value={inputName}
                            onChangeText={(res) => setInputName(res)}
                        />
                        <TextInput
                            placeholder={"Insira seu email!"}
                            style={styles.input}
                            value={inputEmail}
                            onChangeText={(res) => setInputEmail(res)}
                        />
                    </View>
                    {visiblePickerPhoto &&
                        <TouchableOpacity onPress={() => handleSendEmail()} style={styles.submit}>
                            {loadingSendEmail ?
                                <ActivityIndicator size='large' color={'white'} /> :
                                <Text style={styles.textSubmit}>Continuar</Text>}
                        </TouchableOpacity>
                    }
                </View>


            </View>
        );
    }

}

export default Auth;