import React, { useState } from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions

} from 'react-native';
import styles from './styles'
import Icon from '../../assets/icons/icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import 'moment/locale/pt-br';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ChatRooms: React.FC = () => {
    const navigation = useNavigation();
    const [chats, setChats] = useState([])
    const handleHomePage = () => {
        navigation.goBack();
    }
    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#141414' }} />
            <LinearGradient colors={['#191919', '#141414']} style={[styles.header]}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: "center", justifyContent: 'space-between', paddingHorizontal: width * 0.02 }}>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.textHeader]}>Mensagens</Text>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity onPress={handleHomePage} style={[styles.buttomHeader]}>
                            <Icon.Ionicons name="home" size={width * 0.06} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={[styles.buttomHeader]}>
                            <Icon.Ionicons name={"ios-search"} size={width * 0.06} color={'black'} />
                        </TouchableOpacity>
                        <View style={[styles.buttomHeader, { backgroundColor: undefined }]} >

                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                {chats.length === 0 &&
                <Text style={styles.notMsm}>Você não possui conversas</Text>}
            </View>
        </>
    )
}
export default ChatRooms;