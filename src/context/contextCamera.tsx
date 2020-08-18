import React, { createContext, useState, useContext, useEffect } from 'react';

type ContextType = {
    uri: string;
    setUri: (value: string) => void;
    uriSmall: string;
    setUriSmall: (value: string) => void;
    aspectRatio: number;
    setAspectRatio: (value: number) => void;
};


const ContextApp = createContext<ContextType>({
    uri: '',
    setUri: (value: string) => { },
    uriSmall: '',
    setUriSmall: (value: string) => { },
    aspectRatio: 0,
    setAspectRatio: (value: number) => { },


});


const ProviderCamera: React.FC = ({ children }) => {

    const [uri, setUri] = useState<string>('');
    const [uriSmall, setUriSmall] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<number>(0);

    return (
        <ContextApp.Provider value={{
            uri, setUri,
            uriSmall, setUriSmall,
            aspectRatio, setAspectRatio

        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderCamera;


export function useUriImage() {
    const infoUser: ContextType = useContext(ContextApp);
    const { uri, setUri } = infoUser;
    return { uri, setUri };
}


export function useUriImageSmall() {
    const infoUser: ContextType = useContext(ContextApp);
    const { uriSmall, setUriSmall } = infoUser;
    return { uriSmall, setUriSmall };
}

export function useUriImageAspectRatio() {
    const infoUser: ContextType = useContext(ContextApp);
    const { aspectRatio, setAspectRatio } = infoUser;
    return { aspectRatio, setAspectRatio };
}











