
import React, { useEffect, useState, useRef } from 'react';
import {
    Dimensions,
    View,
    ImageBackground,
    Text,
    Platform,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import Icon from '../../assets/icons/icons';
import Modal from 'react-native-modal';
import { Modalize } from 'react-native-modalize';
import LinearGradient from 'react-native-linear-gradient';
import { useUserSaved, useUserName, useUserAvatar, useUserEmail, useUserFeed, useUserID } from '../../context/contextMain';
import styles from './styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
interface ITEMFEED {
    id: number
    aspectRatio: number,
    media: string,
    userID: number,
    image: string,
    small: string,
    avatar: string,
    name: string,
    description: string,
    video: string,
    created_at: string,
    theme: string,
    likes: string,
    likesNumber: number,
}

const Profile: React.FC = () => {
    const navigation = useNavigation();
    const { userID } = useUserID();
    const { userSaved, setUserSaved } = useUserSaved();
    const { userName, setUserName } = useUserName();
    const { userAvatar, setUserAvatar } = useUserAvatar();
    const { userEmail, setUserEmail } = useUserEmail();
    const { userFeed, setUserFeed } = useUserFeed();
    const [isModalVisibleProfile, setModalVisibleProfile] = useState(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(true);
    const [feedModal, setFeedModal] = useState<ITEMFEED>();
    const [countFeedQuery, setCountFeedQuery] = useState<number>(2);
    const [isRefreshFeed, setIsRefreshFeed] = useState<boolean>(false);
    const [lengthFinishPosts,setLengthFinishPosts] = useState<boolean>(false);


    const modalizeRef = useRef<Modalize>(null);
    const onOpenModal = (post: ITEMFEED) => {
        setFeedModal(post);
        modalizeRef.current?.open();
    };

    function handleUserAuth() {
        Toast.showWithGravity('Você precisa se cadastrar', Toast.LONG, Toast.TOP);
        navigation.navigate('Auth');
    }

    const toggleModalProfile = () => {
        setModalVisibleProfile(!isModalVisibleProfile);
    };

    const handleExitAccount = () => {
        console.log('EXIT')
        setUserFeed([]);
        AsyncStorage.clear()
            .then(() => {
                setUserSaved(false);
                setModalVisibleProfile(false);
                setUserAvatar('');
                setUserName('');
                setUserEmail('');

            });
    }

    const likeSelectUnSelect = (post: ITEMFEED) => {
        if (userID == 0) {
            return false;
        }
        const val: string = post.likes;
        const splitArray = val.split(',');
        // console.log('splitArray', splitArray)
        const search = splitArray.indexOf(userEmail);
        // console.log('search', search)
        if (search >= 0) {
            return true
        }
        return false
    }

    const sendLikePost = (post: ITEMFEED, index: number) => {
        if (userID == 0) {
            return handleUserAuth();
        }
        const val = post.likes;
        const splitArray = val.split(',');
        const search = splitArray.indexOf(userEmail);
        api.post('/posts/like', {
            emailUser: userEmail,
            idPost: post.id,
        }).then((res) => {
            //console.log('sucesso no like', res.data)
            const newLikes = String(String(splitArray) + ',' + String(userEmail));
            const search = splitArray.filter(item => item !== userEmail);
            const newLikes2 = String(search);
            if (res.data.message == 'sucesso') {
                userFeed.map(res => res.id === post.id && (
                    res.likes = newLikes,
                    res.likesNumber++
                ))
            } else {
                userFeed.map(res => res.id === post.id && (
                    res.likes = newLikes2,
                    res.likesNumber = Number(search.length)
                ))
            }
        }).catch(res => {
            // console.log('erro no like', res.data)
        }).finally(() => onOpenModal(userFeed[index]))




        //console.log(feed.map(res => res.id == post.id && res))

    }

    function onReachAddPost() {
        api.get(`/posts?user_id=${userID}&page=${countFeedQuery}`).then((res: any) => {
            const DATA: ITEMFEED[] = res.data;
            if (DATA.length === 0) {
                console.log('fim');
                setLengthFinishPosts(true);
                Toast.showWithGravity('Não há mais publicações...', Toast.SHORT, Toast.TOP);
            } else {
                DATA.forEach((element: ITEMFEED) => {
                    setUserFeed([...userFeed, element]);
                });
            }
        })
        return setCountFeedQuery(countFeedQuery + 1)
    }

    function onRefresh() {
        //console.log('REFRESH')
        setIsRefreshFeed(true);

        setCountFeedQuery(2);
        setUserFeed([])
        setLengthFinishPosts(false);
        api.get(`/posts?user_id=${userID}&page=${1}`).then((res: any) => {
            const DATA = res.data;
            if(DATA.length === 0){
                 setLengthFinishPosts(true);
            }
            setUserFeed(DATA);
        })
        return setIsRefreshFeed(false);
    }


    function RenderPost(post: ITEMFEED, index: number) {
        return (
            <View key={index} style={[{ minHeight: (width / post.aspectRatio) + 110 }, styles.containerPost]}>
                <ImageBackground blurRadius={7} source={{ uri: post.small }} style={{ flex: 1 }}>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{post.description}</Text>
                    </View>
                    <Image source={{ uri: post.image }} style={[styles.imagePost, { height: (width / post.aspectRatio), }]} />
                    <View style={styles.downViewPost}>
                        <View style={styles.containerAvatarNamePost}>
                            <TouchableOpacity>
                                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                            </TouchableOpacity>
                            <View>
                                <Text numberOfLines={1} style={styles.name}>{post.name}</Text>
                                <Text numberOfLines={1} style={styles.mommentPost}>{moment(post.created_at).locale('pt-br').fromNow()}</Text>
                            </View>
                        </View>
                        <View style={styles.containerButtonsEndViewPost}>
                            <TouchableOpacity onPress={() => sendLikePost(post, index)} >
                                <Icon.AntDesign name={likeSelectUnSelect(post) ? "heart" : "hearto"} size={width * 0.06} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onOpenModal(post)}  >
                                <Icon.Ionicons name="ios-chatbox" size={width * 0.06} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <Icon.MaterialIcons name="more-vert" size={width * 0.06} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }







    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#141414' }} />
            <View style={styles.headerProfile}>
                <TouchableWithoutFeedback onPress={() => userSaved ? toggleModalProfile() : handleUserAuth()}>
                    <View style={styles.containerProfile}>
                        <FastImage
                            source={userSaved ? { uri: userAvatar, priority: FastImage.priority.high } : require('../../assets/sem_foto_perfil.png')} resizeMode={FastImage.resizeMode.contain} style={styles.profile}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.info}>
                    <Text style={styles.textInfoName}>{userSaved ? userName : 'Nome de Usuário'}</Text>
                    <Text style={styles.textInfoPubCox}>Publicacoes: {Number(userFeed.length)}</Text>
                    <Text style={styles.textInfoPubCox}>Conexões: 0</Text>
                </View>
                <View style={styles.backButtom}>
                    <TouchableOpacity style={styles.backButtomNavigator} onPress={() => navigation.goBack()}>
                        <Icon.MaterialIcons name='arrow-back' size={width * 0.06} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
            <LinearGradient colors={['#191919', '#141414']} style={styles.container}>
                {userSaved ?
                    <FlatList
                        data={userFeed}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        refreshing={isRefreshFeed}
                        onEndReachedThreshold={0.2}
                        style={{ flex: 1, height: height, width: width }}
                        onEndReached={onReachAddPost}
                        onRefresh={onRefresh}
                        renderItem={({ item, index }) => RenderPost(item, index)}
                        keyExtractor={(item: ITEMFEED, index) => String(index)}
                        ListFooterComponent={() => <>
                            <TouchableOpacity onPress={onRefresh}>
                                <View style={{ width: '100%', height: width * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    {lengthFinishPosts ?
                                    <Icon.Ionicons name='refresh' size={width * 0.1} color='white' />:
                                    <ActivityIndicator size={'large'} color='white'/>}
                                </View>
                            </TouchableOpacity>
                        </>}
                    />
                    :
                    <TouchableWithoutFeedback onPress={handleUserAuth}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Image style={{ width: width * 0.5, height: width * 0.5 }} source={require('../../assets/addAccount.png')} />
                            <Text style={{ color: 'white', fontSize: width * 0.07 }}>Criar Usuário!</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </LinearGradient>
            <Modal isVisible={isModalVisibleProfile}
                swipeDirection="down"
                customBackdrop={
                    <TouchableWithoutFeedback onPress={toggleModalProfile}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', }} />
                    </TouchableWithoutFeedback>
                }
                onBackButtonPress={toggleModalProfile}
                onSwipeComplete={toggleModalProfile}>
                <View style={styles.containerViewModalFlex}>
                    <View style={styles.containerModalProfile}>
                        <View style={styles.headerModalProfile}>
                            <Text style={styles.textInfoName}>{userName}</Text>
                            <TouchableWithoutFeedback onPress={handleExitAccount}>
                                <Icon.Ionicons name="exit-outline" size={width * 0.08} color={'white'} />
                            </TouchableWithoutFeedback>
                        </View>
                        <FastImage resizeMode={FastImage.resizeMode.contain}
                            source={{ uri: userAvatar, priority: FastImage.priority.high }} style={styles.avatarModalProfile} />
                    </View>
                </View>
            </Modal>
            <Modalize ref={modalizeRef}
                modalStyle={{ backgroundColor: '#191919', paddingVertical: width * 0.05 }}
                snapPoint={width * 0.2}
                modalHeight={width * 0.3} >
                <View style={{flexDirection: 'row', width:'100%' }}>
                    <View style={styles.containerAvatarNamePost}>
                        <TouchableOpacity>
                            <Image source={{ uri: feedModal?.avatar }} style={styles.avatar} />
                        </TouchableOpacity>
                        <View>
                            <Text numberOfLines={1} style={[styles.name]}>{feedModal?.name}</Text>
                            <Text numberOfLines={1} style={styles.mommentPost}>{moment(feedModal?.created_at).locale('pt-br').fromNow()}</Text>
                        </View>
                    </View>
                    <View style={styles.containerButtonsEndViewPost}>
                        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '100%', width: '40%' }} >
                            <Text style={{ color: 'white', fontSize: width * 0.055 }}>{feedModal?.likesNumber}</Text>
                            <Icon.AntDesign name={feedModal?.likesNumber == 0 ? "hearto" : "heart"} size={width * 0.06} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} >
                            <Icon.Ionicons name="ios-chatbox" size={width * 0.06} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>



            </Modalize>
        </>
    );

}
export default Profile;