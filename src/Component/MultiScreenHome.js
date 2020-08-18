import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, View } from 'react-native';
import Home from '../pages/Home';
import CameraScreen from '../pages/Camera';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const MultiScreenHome = () => {
    const [indexScroll, setIndexScroll] = useState(0);

    useEffect(() => {

    }, [indexScroll])
    const RefCarousel = useRef(null).current;
    const DATA = [
        "Home",
        "Camera"

    ];

    function RenderPages(page, index) {

        if (Number(index) === 0) {
            return <Home />
        } else {
            return <CameraScreen />
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#141414' }}>
            <Carousel ref={RefCarousel}
                layout={'stack'}
                data={DATA}
                renderItem={
                    ({ item, index }) => RenderPages(item, index)
                }
                onSnapToItem={(e) => setIndexScroll(e)}
                sliderWidth={width}
                itemWidth={width}
            />
        </View>
    )
}
export default MultiScreenHome;