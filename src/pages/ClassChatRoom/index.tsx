import React, { useEffect, useState } from 'react';

import {
    View,
    Platform,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import styles from './styles';
import Icon from '../../assets/icons/icons';
import LinearGradient from 'react-native-linear-gradient';
import 'moment/locale/pt-br';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useUserID, useUserEmail } from '../../context/contextMain';
import api, { URL } from '../../services/api';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import io from "socket.io-client";

interface USERS {
    id: number,
    avatar: string,
    name: string,
    email: string,
    status: string,
    room: string
}
interface MESSAGE {
    id: number,
    mensagem: string,
    status: string,
    userID: number,
    room: string,
    type: string,
    media: string
}

const ClassChatRoom: React.FC<any> = ({ navigation, route }) => {
    const { userData, create } = route.params;
    const user: USERS = userData;
    const socket = io(URL);
    const { userID } = useUserID();
    const { userEmail } = useUserEmail();
    const [isCreate, setIsCreate] = useState<boolean>(create);
    const [roomChat, setRoomChat] = useState<string>(user.room);
    const [messages, setMessages] = useState<MESSAGE[]>([]);
    const [sendTextMessage, setSendTextMessage] = useState<string>('');
    const asyncMessageSocket = (room: string) => {
        socket.on(`${isCreate ? room : roomChat}`, (a: any) => {
        })
    }
    const sendMessage = (room: string) => {
        api.post('/message/create', {
            mensagem: sendTextMessage,
            status: "1",
            userID: userID,
            room: isCreate ? room : roomChat,
            type: "1",
            media: "null"
        })
        if (isCreate) {
            setRoomChat(room);
            setIsCreate(false);
            asyncMessageSocket(room);
        }
    }
    const onSubmit = () => {
        if (sendTextMessage.length === 0) {
            return;
        }
        if (isCreate) {
            api.post('/room/create', {
                userID0: userID,
                userID1: user.id,
                email0: userEmail,
                email1: user.email
            }).then((res) => {
                if (res.data.message === 'error') {
                    return;
                }
                sendMessage(`${userEmail}:${user.email}`);
            }).catch(err => console.log(err))
        } else {
            sendMessage(`nada-ignora`);
        }
    }

    function RenderMessage(item: MESSAGE, index: number) {
        if (item.userID !== userID) {
            return (
                <View key={index} style={{ width: width, minHeight: width * 0.12, maxHeight: undefined, flexDirection: 'row', paddingBottom: width * 0.05 }}>
                    <View style={{ height: '100%', width: '60%', flexDirection: 'row', paddingHorizontal: width * 0.02 }}>
                        <View style={{ backgroundColor: 'forestgreen', padding: width * 0.02, justifyContent: 'center', borderTopRightRadius: width * 0.021, borderBottomLeftRadius: width * 0.021 }}>
                            <Text style={{ color: 'white', fontSize: width * 0.04 }}>{item.mensagem}</Text>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View key={index} style={{ width: width, minHeight: width * 0.12, maxHeight: undefined, flexDirection: 'row-reverse', paddingBottom: width * 0.05 }}>
                    <View style={{ height: '100%', width: '60%', flexDirection: 'row-reverse', paddingHorizontal: width * 0.02 }}>
                        <View style={{ backgroundColor: '#E5E5E5', padding: width * 0.02, justifyContent: 'center', borderTopLeftRadius: width * 0.021, borderBottomRightRadius: width * 0.021 }}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>{item.mensagem}</Text>
                        </View>
                    </View>
                </View>
            );
        }

    }


    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#141414' }} />
            <LinearGradient colors={['#191919', '#141414']} style={[styles.header]}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backView} >
                        <Icon.Ionicons name='ios-chevron-back' color='white' size={width * 0.1} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: width * 0.055, fontWeight: '500' }}>{user.name}</Text>
                    <TouchableOpacity style={[styles.imageView, { right: width * 0.03 }]} >
                        <Image source={{ uri: user.avatar }} style={{ width: '98%', height: '98%', borderRadius: (width * 0.12) / 2 }} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    bounces={false}
                    onEndReachedThreshold={0.1}
                    style={{ flex: 1 }}
                    data={messages}
                    inverted
                    keyExtractor={(item: MESSAGE) => String(item.id)}
                    renderItem={({ item, index }) => RenderMessage(item, index)}
                    ListHeaderComponent={() => <View style={{ width: width, height: width * 0.1 }} />}
                    ListFooterComponent={() => <View style={{ width: width, height: width * 0.1 }} />}
                />
            </View>
            <View style={styles.InputChat}>
                <TextInput
                    style={styles.inputMessage}
                    placeholder={'Digite sua mensagem...'}
                    value={sendTextMessage}
                    onChangeText={(e) => setSendTextMessage(e)}
                />
                <TouchableOpacity style={styles.send} activeOpacity={0.7} >
                    <Icon.FontAwesome name={'send'} color={'white'} size={width * 0.05} />
                </TouchableOpacity>
            </View>
        </>
    )
}
export default ClassChatRoom;