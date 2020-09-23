import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    TextInput,
    RefreshControl,
    FlatList,
    Dimensions,
    Image,
    Animated,
    Platform,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';

import api from '../../services/api';
import SplashScreen from 'react-native-splash-screen'
import styles from './styles';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-simple-toast';
import Icon from '../../assets/icons/icons';
import LinearGradient from 'react-native-linear-gradient';
import { useFeed, useUserID, useUserEmail } from '../../context/contextMain';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
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
const Home: React.FC = () => {
    const { feed, setFeed } = useFeed();
    const { userID, setUserID } = useUserID();
    const { userEmail } = useUserEmail();
    const navigation = useNavigation();
    const [feedModal, setFeedModal] = useState<ITEMFEED>();
    const [countFeedQuery, setCountFeedQuery] = useState<number>(2);
    const [isRefreshFeed, setIsRefreshFeed] = useState<boolean>(false);
    const [lengthFinishPosts, setLengthFinishPosts] = useState<boolean>(false);
    const [loadingOnReach, setLoadingOnReach] = useState<boolean>(false);

    useEffect(() => { }, [isRefreshFeed])

    const modalizeRef = useRef<Modalize>(null);
    const onOpenModal = (post: ITEMFEED) => {
        setFeedModal(post);
        modalizeRef.current?.open();
    };
    useEffect(() => {
        SplashScreen.hide()
    }, []);


    function handleUserAuth() {
        Toast.showWithGravity('Você precisa se cadastrar', Toast.LONG, Toast.TOP);
        navigation.navigate('Auth');
    }

    function handleCommentsPage(id: string) {
        navigation.navigate('Comments', { postID: id });
    }
    function handleChatRoomsPage() {
        if (userID == 0) {
            return handleUserAuth();
        }
        navigation.navigate('ChatRooms');
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
                feed.map(res => res.id === post.id && (
                    res.likes = newLikes,
                    res.likesNumber++
                ))
            } else {
                feed.map(res => res.id === post.id && (
                    res.likes = newLikes2,
                    res.likesNumber = Number(search.length)
                ))
            }
        }).catch(res => {
            // console.log('erro no like', res.data)
        }).finally(() => onOpenModal(feed[index]))




        //console.log(feed.map(res => res.id == post.id && res))

    }

    function onReachAddPost() {
        if (loadingOnReach) {
            return;
        }
        setLoadingOnReach(true)
        api.get(`/posts?page=${countFeedQuery}`).then((res: any) => {
            const DATA: ITEMFEED[] = res.data;
            if (DATA.length === 0) {
                console.log('fim')
                setLengthFinishPosts(true);
                Toast.showWithGravity('Não há mais publicações...', Toast.SHORT, Toast.TOP);
            } else {
                DATA.forEach((element: ITEMFEED) => {
                    setFeed([...feed, element]);
                });
            }
        })
        setCountFeedQuery(countFeedQuery + 1)
        return setLoadingOnReach(false)
    }

    function onRefresh() {
        //console.log('REFRESH')
        setIsRefreshFeed(true);
        setLengthFinishPosts(false);
        setCountFeedQuery(2);
        setFeed([])
        api.get(`/posts?page=${1}`).then((res: any) => {
            const DATA = res.data;
            if (DATA.length === 0) {
                setLengthFinishPosts(true);
            }
            setFeed(DATA);
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
                                <Text numberOfLines={1} style={styles.mommentPost}>{moment(post.created_at).locale('pt-br').format('L')}</Text>
                            </View>
                        </View>
                        <View style={styles.containerButtonsEndViewPost}>
                            <TouchableOpacity onPress={() => sendLikePost(post, index)} >
                                <Icon.AntDesign name={likeSelectUnSelect(post) ? "heart" : "hearto"} size={width * 0.06} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCommentsPage(String(post.id))}  >
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
            <LinearGradient colors={['#191919', '#141414']} style={[styles.header]}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: "center", justifyContent: 'space-between', paddingHorizontal: width * 0.02 }}>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.textHeader]}>Switch Chat</Text>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity style={[styles.buttomHeader]} onPress={() => navigation.navigate('Profile')}>
                            <Icon.Ionicons name="md-person" size={width * 0.06} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleChatRoomsPage} style={[styles.buttomHeader]}>
                            <Icon.Ionicons name="ios-chatbubbles" size={width * 0.06} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={[styles.buttomHeader]}>
                            <Icon.Ionicons name={"ios-search"} size={width * 0.06} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                <FlatList
                    data={feed}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    refreshing={isRefreshFeed}
                    onEndReachedThreshold={0.2}
                    style={{ flex: 1 }}
                    onEndReached={onReachAddPost}
                    onRefresh={onRefresh}
                    renderItem={({ item, index }) => RenderPost(item, index)}
                    keyExtractor={(item: ITEMFEED, index) => String(index)}
                    ListFooterComponent={() => <>
                        <TouchableOpacity onPress={onRefresh}>
                            <View style={{ width: '100%', height: width * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                {lengthFinishPosts ?
                                    <Icon.Ionicons name='refresh' size={width * 0.1} color='white' /> :
                                    <ActivityIndicator size={'large'} color='white' />}
                            </View>
                        </TouchableOpacity>
                    </>}
                />

            </View>

            <Modalize ref={modalizeRef}
                modalStyle={{ backgroundColor: '#191919', paddingVertical: width * 0.05 }}
                snapPoint={width * 0.2}
                modalHeight={width * 0.3} >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.containerAvatarNamePost}>

                        <TouchableOpacity>
                            <Image source={{ uri: feedModal?.avatar }} style={styles.avatar} />
                        </TouchableOpacity>
                        <View>
                            <Text numberOfLines={1} style={[styles.name]}>{feedModal?.name}</Text>
                            <Text numberOfLines={1} style={styles.mommentPost}>{moment(feedModal?.created_at).locale('pt-br').format('L')}</Text>
                        </View>
                    </View>
                    <View style={styles.containerButtonsEndViewPost}>
                        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '100%', width: '40%' }} >
                            <Text style={{ color: 'white', fontSize: width * 0.055 }}>{feedModal?.likesNumber}</Text>
                            <Icon.AntDesign name={feedModal?.likesNumber == 0 ? "hearto" : "heart"} size={width * 0.06} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCommentsPage(String(feedModal?.id))} >
                            <Icon.Ionicons name="ios-chatbox" size={width * 0.06} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modalize>
        </>
    );
}

export default Home;
