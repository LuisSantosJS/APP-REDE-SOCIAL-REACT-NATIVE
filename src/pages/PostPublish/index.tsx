import React, { useEffect, useState } from 'react';
import {
    View,
    ImageBackground,
    ScrollView,
    Image,
    Text,
    Platform,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from './styles';
import Constants from 'expo-constants';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import SwitchSelector from "react-native-switch-selector";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import 'moment/locale/pt-br';
import Icon from '../../assets/icons/icons';
import { useUriImage, useUriImageAspectRatio, useUriImageSmall } from '../../context/contextCamera';
import { useUserAvatar, useUserName, useUserID, } from '../../context/contextMain';
import api from '../../services/api';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PostPublish: React.FC = () => {
    const navigation = useNavigation();
    const BACKIMAGE: string = 'https://firebasestorage.googleapis.com/v0/b/switch-chat-7777.appspot.com/o/images%2Ftrailer-exterminador-do-futuro-destino-sombrio-arnold-schwarzenegger-1558623995_40x40.jpg?alt=media&token=a311069a-0388-4fdf-bebd-7b2c832da1c3';
    const { uriSmall } = useUriImageSmall();
    const { aspectRatio } = useUriImageAspectRatio();
    const { uri } = useUriImage();
    const [imageURI, setImageURI] = useState<string>('');
    const [imageURISMALL, setImageURISMALL] = useState<string>('');
    const { userAvatar } = useUserAvatar();
    const { userID } = useUserID();
    const { userName } = useUserName();
    const [inputDesc, setInputDesc] = useState<string>('');
    const [loadingSendPost, setLoadingSendPost] = useState<boolean>(false);
    const [selectCustomBackGround, setSelectCustomBackGround] = useState<string>('C')
    useEffect(() => { }, []);

    function postDefault(IMAGEURLDATABASE: string) {
        const DATA = {
            userID: userID,
            aspectRatio: aspectRatio,
            media: 'image',
            image: IMAGEURLDATABASE,
            small: BACKIMAGE,
            video: 'false',
            likes: [],
            likesNumber: 0,
            description: inputDesc,
        }

        api.post('/posts/create', DATA).then((res) => {
            if (res.data.message == 'sucesso') {
                Toast.showWithGravity('Sucesso', Toast.LONG, Toast.TOP);

            } else {
                Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            }
        }).catch(() => {
            Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);

        })
        return navigation.goBack();

    }

    function postCustom(IMAGEURLDATABASE: string, IMAGEURLSMALLDATABASE: string) {
        const DATA = {
            userID: userID,
            aspectRatio: aspectRatio,
            media: 'image',
            image: IMAGEURLDATABASE,
            small: IMAGEURLSMALLDATABASE,
            video: 'false',
            likes: [],
            likesNumber: 0,
            description: inputDesc,
        }

        api.post('/posts/create', DATA).then((res) => {
            if (res.data.message == 'sucesso') {
                Toast.showWithGravity('Sucesso', Toast.LONG, Toast.TOP);

            } else {
                Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
            }
        }).catch(() => {
            Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);

        })
        return navigation.goBack();
    }


    function sendPost() {
        if (loadingSendPost) {
            return;
        }
        setLoadingSendPost(true);
        var chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
        var result = '';
        for (var i = 0; i < 55; i++) {
            var x = Math.floor(Math.random() * chars.length);
            result += chars[x];
        }
        const nameImagePostSend: string = result;
        storage().ref(`ImagePost/${nameImagePostSend}`).putFile(`${uri}`).then(() => {
            storage().ref(`ImagePost/${nameImagePostSend}`).getDownloadURL().then(url => {
                const IMAGEURLDATABASE: string = url;
                if (selectCustomBackGround === 'C') {
                    storage().ref(`ImagePostSmall/${nameImagePostSend}`).putFile(`${uriSmall}`).then(() => {
                        storage().ref(`ImagePostSmall/${nameImagePostSend}`).getDownloadURL().then(urlSmall => {
                            const IMAGEURLSMALLDATABASE: string = urlSmall;
                            return postCustom(IMAGEURLDATABASE, IMAGEURLSMALLDATABASE)
                        });
                    });
                } else {
                    postDefault(IMAGEURLDATABASE)

                }
            })
        })

    };
    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#141414' }} />
            <LinearGradient colors={['#191919', '#141414']} style={[styles.header]}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: "center", justifyContent: 'space-between', paddingHorizontal: width * 0.02 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={[styles.headerTextContainer, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <Icon.MaterialIcons name='arrow-back' size={width * 0.06} color="white" />
                            <Text style={styles.textHeader}>Cancelar</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.headerIconContainer}>

                    </View>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={[{ minHeight: (width / aspectRatio) + 110 }, styles.containerPost]}>
                        <ImageBackground blurRadius={7} source={selectCustomBackGround == 'C' ? { uri: uriSmall } : { uri: BACKIMAGE }} style={{ flex: 1 }}>
                            <View style={styles.description}>
                                <TextInput style={styles.descriptionText}
                                    value={inputDesc}
                                    onChangeText={(e) => setInputDesc(e)}
                                    multiline

                                    placeholder={'Insira uma descrição...'}
                                />
                            </View>
                            <Image source={{ uri: uri }} style={[styles.imagePost, { height: (width / aspectRatio), }]} />
                            <View style={styles.downViewPost}>
                                <View style={styles.containerAvatarNamePost}>
                                    <TouchableOpacity>
                                        <Image source={{ uri: userAvatar }} style={styles.avatar} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text numberOfLines={1} style={styles.name}>{userName}</Text>
                                        <Text numberOfLines={1} style={styles.mommentPost}>{moment(new Date()).locale('pt-br').fromNow()}</Text>
                                    </View>
                                </View>
                                <View style={styles.containerButtonsEndViewPost}>
                                    <TouchableOpacity onPress={() => { }} >
                                        <Icon.AntDesign name={"hearto"} size={width * 0.06} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}  >
                                        <Icon.Ionicons name="ios-chatbox" size={width * 0.06} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Icon.MaterialIcons name="more-vert" size={width * 0.06} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.containerOptions}>
                        <SwitchSelector
                            style={{ width: '80%' }}
                            initial={0}
                            onPress={(value) => setSelectCustomBackGround(String(value))}
                            textColor={'#7a44cf'} //'#7a44cf'
                            selectedColor={'white'}
                            buttonColor={'#7a44cf'}
                            borderColor={'#7a44cf'}
                            hasPadding
                            options={[
                                { label: "Custom", value: "C" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                                { label: "Default", value: "D" } //images.masculino = require('./path_to/assets/img/masculino.png')
                            ]}
                        />
                        <TouchableOpacity onPress={sendPost} style={styles.submit}>
                            {loadingSendPost ?
                                <ActivityIndicator size='large' color={'white'} /> :
                                <Text style={styles.textSubmit}>Publicar</Text>}
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </>

    )
}

export default PostPublish;