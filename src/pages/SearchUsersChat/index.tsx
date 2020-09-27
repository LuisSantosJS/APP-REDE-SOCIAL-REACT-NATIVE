import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import styles from './styles';
import api from '../../services/api';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
interface USERS {
    id: number,
    avatar: string,
    name: string,
    email: string,
    status: string
}
const SearchUserChat: React.FC = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState<USERS[]>([]);

    useEffect(() => {
        api.get('/users').then(res => {
            setUsers(res.data);
        }).catch(() => {
            Toast.showWithGravity('Ocorreu um erro ao procurar usuários!', Toast.LONG, Toast.TOP);
        })
    }, []);
    const handlePageChatClassRoom = (user: USERS) => {
        const userData: USERS = user;
        const create: boolean = true;
        navigation.navigate('ClassChatRoom', { userData, create })
    }
    function RenderUsers(item: USERS, index: number) {
        return (
            <>
                <View key={index} style={{ flex: 1, width: width, height: width * 0.22, alignContent: "center", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#191919', borderWidth: width * 0.0008, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ height: width * 0.16, width: width * 0.16, borderRadius: (width * 0.16) / 2, borderWidth: width * 0.005, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: item.avatar }} style={{ height: '98%', width: '98%', borderRadius: (width * 0.16) / 2, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handlePageChatClassRoom(item)}
                        style={{ height: '90%', width: '75%', justifyContent: 'space-around' }}>
                        <Text style={{ color: 'white', fontSize: width * 0.05, fontWeight: '500' }}>{item.name}</Text>
                        <Text style={{ color: '#E5E5E5', fontSize: width * 0.04 }}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
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
                    data={users}
                    keyExtractor={(item: USERS) => String(item.id)}
                    renderItem={({ item, index }) => RenderUsers(item, index)}
                    ListFooterComponent={() => <View style={{ width: width, height: width * 0.1 }} />}
                />

            </View>
        </>
    )
}
export default SearchUserChat;