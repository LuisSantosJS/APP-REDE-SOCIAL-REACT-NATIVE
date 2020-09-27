import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    header: {
        height: width * 0.17,
        width: width,
        left: 0, right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191919'
    },
    imageView: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: (width * 0.12) / 2,
        borderWidth: width * 0.005,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backView: {
        width: width * 0.12,
        height: width * 0.12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    InputChat: {
        width: '100%',
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: '#141414',

    },
    inputMessage: {
        height: '60%',
        width: '80%',
        backgroundColor: '#E5E5E5',
        borderRadius: width * 0.04,
        paddingLeft: 10,
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    send: {
        height: width * 0.12,
        width: width * 0.12,
        borderRadius: width * 0.3,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
});
export default styles;