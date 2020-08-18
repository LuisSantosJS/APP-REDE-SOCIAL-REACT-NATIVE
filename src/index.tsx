import React, { useEffect } from 'react';
import MainRouter from './router/main';
import ProviderAuth from './context/contextMain';
import PrpviderCamera from './context/contextCamera';
import { Dimensions, View, Text } from 'react-native';
const App = () => {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
        <ProviderAuth>
            <PrpviderCamera>
                <MainRouter />
            </PrpviderCamera>
        </ProviderAuth>
    );
}

export default App;