import React from 'react';
import MainRouter from './router/main';
import ProviderAuth from './context/contextMain';
import ProviderCamera from './context/contextCamera';
import ProviderChat from './context/contextChat'
import { Dimensions } from 'react-native';
const App = () => {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
        <ProviderAuth>
            <ProviderCamera>
                <ProviderChat>
                    <MainRouter />
                </ProviderChat>
            </ProviderCamera>
        </ProviderAuth>
    );
}

export default App;