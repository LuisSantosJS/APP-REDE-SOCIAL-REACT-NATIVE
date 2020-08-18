import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    gridContainerButtons: {
        position: 'absolute',
        width: '100%',
        height: '12%',
        top: height - (height * 0.15),
        left: 0,
        right: 0,
        elevation: 20000
    },
    colGridItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPressCamera: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: ((width * 0.2) / 2),
        borderWidth: width * 0.006,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'

    },
    iconPressCameraRec: {
        width: width * 0.22,
        height: width * 0.22,
        borderRadius: ((width * 0.23) / 2),
        borderWidth: width * 0.007,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPressCameraDentro: {
        width: width * 0.19,
        height: width * 0.19,
        borderRadius: ((width * 0.19) / 2),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alginTouchIcon: {
        width: '80%', height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewFlashIcon: {
        position: 'absolute',
        width: width * 0.12,
        height: width * 0.12,
        top: width*0.07,
        left: width -  width * 0.17,

        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;