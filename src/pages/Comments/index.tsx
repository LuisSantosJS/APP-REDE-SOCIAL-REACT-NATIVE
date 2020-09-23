import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Text,
    FlatList,
    Image
} from 'react-native';
import Icon from '../../assets/icons/icons';
import api, { URL } from '../../services/api';
import { useUserID } from '../../context/contextMain';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import io from "socket.io-client";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
interface COMMENTSLIST {
    id: number,
    postID: number,
    userID: number,
    comment: string,
    likes: string,
    likesNumber: number,
    created_at: string,
    updated_at: string,
    name: string,
    avatar: string,
    email: string
}
const Comments: React.FC<any> = ({ navigation, route }) => {
    const socket = io(URL);
    const postID = route.params.postID;
    const { userID } = useUserID();
    const [commentsList, setCommentsList] = useState<COMMENTSLIST[]>([]);
    const [sendTextMessage, setSendTextMessage] = useState<string>('');
    useEffect(() => {
        api.get(`/comments?postID=${postID}`).then(res => {
            setCommentsList(res.data.res);
        })
        socket.on(`commets-${postID}`, (res: COMMENTSLIST[]) => {
            setCommentsList(res);
        })
    }, []);

    const onSubmit = () => {
        if (sendTextMessage.length === 0) {
            return;
        }
        if (userID === 0) {
            Toast.showWithGravity('Você precisa se cadastrar', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth');
        }
        api.post('/comments/create', {
            postID: postID,
            userID: userID,
            comment: sendTextMessage
        })
        setSendTextMessage('')
    }

    function RenderComments(item: COMMENTSLIST, index: number) {
        return (
            <>
                <View key={index} style={styles.viewCommment}>
                    <View style={styles.viewBodyComment}>
                        <View style={styles.bodyComment}>
                            <View style={styles.viewImageComment}>
                                <Image source={{ uri: item.avatar }} style={styles.imageComment} />
                            </View>
                            <Text style={styles.textComment}>{item.comment}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.nameUsetCommentText}>@{item.name}</Text>
            </>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    bounces={false}
                    onEndReachedThreshold={0.1}
                    style={{ flex: 1 }}
                    data={commentsList}
                    inverted
                    keyExtractor={(item: COMMENTSLIST) => String(item.id)}
                    renderItem={({ item, index }) => RenderComments(item, index)}
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
                <TouchableOpacity style={styles.send} activeOpacity={0.7} onPress={onSubmit}>
                    <Icon.FontAwesome name={'send'} color={'white'} size={width * 0.05} />
                </TouchableOpacity>
            </View>

        </>
    )
}
export default Comments;