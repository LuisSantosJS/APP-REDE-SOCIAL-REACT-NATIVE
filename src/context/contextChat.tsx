import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUserID } from '../context/contextMain';
import api, { URL } from '../services/api';
import io from "socket.io-client";
interface ROOMS {
    id: number,
    room: string,
    userID0: number,
    userID1: number,
    created_at: string,
    updated_at: string
}

interface USER {
    id: string,
    avatar: string,
    name: string,
    email: string,
    status: string
}
interface LASTDATA {
    id: string,
    mensagem: string,
    status: string,
    userID: string,
    room: string,
    type: string,
    media: string,
    created_at: string,
    updated_at: string
}

interface ROOMDATA {
    user: USER,
    lastMessage: LASTDATA
}
type ContextType = {
    rooms: ROOMS[];
    setRooms: (value: ROOMS[]) => void;
};


const ContextApp = createContext<ContextType>({
    rooms: [],
    setRooms: (value: ROOMS[]) => { },
});


const ProviderChat: React.FC = ({ children }) => {
    const { userID } = useUserID();
    const [rooms, setRooms] = useState<ROOMS[]>([]);
    const [roomsData, setRoomsData] = useState<ROOMDATA[]>([])
    const socket = io(URL);
    const youID = (element: ROOMS) => {
        if (element.userID0 == userID) {
            return element.userID1;
        } else {
            return element.userID0;
        }
    }

    // useEffect(() => {
    //     const loadRooms = () => {
    //         setRoomsData([]);
    //         api.get(`/room/index?userID=${userID}`).then(res => {
    //             setRooms(res.data.res);
    //             res.data.res.forEach((element: ROOMS) => {
    //                 api.get(`/room/data?room=${element.room}&youID=${youID(element)}`).then(data => {
    //                     const result = {
    //                         user: data.data.user,
    //                         lastMessage: data.data.lastMessage
    //                     }
    //                     console.log('meus contatos', result);
    //                     setRoomsData([...roomsData, result]);
    //                 })
    //             });
    //         })
    //     }
    //     loadRooms();
    //     socket.on(`chat-${userID}`, (a: any) => {
    //         loadRooms();
    //     });
    // }, [])

    return (
        <ContextApp.Provider value={{
            rooms, setRooms
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderChat;


export function useRoomsChat() {
    const infoUser: ContextType = useContext(ContextApp);
    const { rooms, setRooms } = infoUser;
    return { rooms, setRooms };
}












