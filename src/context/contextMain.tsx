import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import getRealm from '../services/realm';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
interface ITEMFEED {
    id: number
    aspectRatio: number,
    media: string,
    userID: number,
    theme: string,
    image: string,
    small: string,
    avatar: string,
    name: string,
    description: string,
    video: string,
    created_at: string,
    likes: string,
    likesNumber: number,
}

type ContextType = {
    feed: ITEMFEED[];
    setFeed: (value: ITEMFEED[]) => void;
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    userName: string;
    setUserName: (value: string) => void;
    userEmail: string;
    setUserEmail: (value: string) => void;
    userAvatar: string;
    setUserAvatar: (value: string) => void;
    userFeed: ITEMFEED[];
    setUserFeed: (value: ITEMFEED[]) => void;
    userID: number;
    setUserID: (value: number) => void;

};


const ContextApp = createContext<ContextType>({
    feed: [],
    setFeed: (value: ITEMFEED[]) => { },
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    userName: '',
    setUserName: (value: string) => { },
    userEmail: '',
    setUserEmail: (value: string) => { },
    userAvatar: '',
    setUserAvatar: (value: string) => { },
    userFeed: [],
    setUserFeed: (value: ITEMFEED[]) => { },
    userID: 0,
    setUserID: (value: number) => { },



});

interface USER {
    avatar: string;
    email: string;
    id: number;
    name: string
}



const ProviderAuth: React.FC = ({ children }) => {
    const [feed, setFeed] = useState<ITEMFEED[]>([]);
    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [userFeed, setUserFeed] = useState<ITEMFEED[]>([]);
    const [userID, setUserID] = useState<number>(0);


    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@user_data');
                if (jsonValue != null) {
                    //console.log(JSON.parse(jsonValue))
                    const USERDATA: USER = JSON.parse(jsonValue);
                    setUserAvatar(USERDATA.avatar);
                    setUserEmail(USERDATA.email);
                    setUserID(USERDATA.id);
                    setUserName(USERDATA.name);
                    setUserSaved(true);
                }
            } catch (e) {
                // error reading value
            }
        }
        getData();
    }, []);
    useEffect(() => {
        if (userSaved && (userID !== 0)) {
            api.get(`/posts?user_id=${userID}&page=1`).then(res => {
                setUserFeed(res.data);
            })
        }
    }, [userSaved, userID])
    useEffect(() => { }, [feed])

    useEffect(() => { }, [userFeed, userAvatar, userEmail, userName, feed]);
    useEffect(() => {
        async function LoadFeed() {
            api.get(`/posts?page=1`).then((res) => {
                setFeed(res.data);
            }).catch(err => {
                Toast.showWithGravity('Ocorreu um erro ao carregar feed!', Toast.LONG, Toast.TOP);
            })
        }
        LoadFeed();
    }, []);

    return (
        <ContextApp.Provider value={{
            feed, setFeed,
            userSaved, setUserSaved,
            userName, setUserName,
            userEmail, setUserEmail,
            userAvatar, setUserAvatar,
            userFeed, setUserFeed,
            userID, setUserID
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderAuth;


export function useFeed() {
    const infoUser: ContextType = useContext(ContextApp);
    const { feed, setFeed } = infoUser;
    return { feed, setFeed };
}

export function useUserFeed() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userFeed, setUserFeed } = infoUser;
    return { userFeed, setUserFeed };
}

export function useUserName() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userName, setUserName } = infoUser;
    return { userName, setUserName };
}

export function useUserEmail() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userEmail, setUserEmail } = infoUser;
    return { userEmail, setUserEmail };
}

export function useUserAvatar() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userAvatar, setUserAvatar } = infoUser;
    return { userAvatar, setUserAvatar };
}

export function useUserSaved() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}

export function useUserID() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userID, setUserID } = infoUser;
    return { userID, setUserID };
}










