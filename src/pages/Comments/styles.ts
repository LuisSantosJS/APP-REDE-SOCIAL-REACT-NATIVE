import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
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
        backgroundColor: '#808080',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    viewCommment: {
        width: width,
        minHeight: width * 0.12,
        maxHeight: undefined,
        flexDirection: 'row',
        paddingBottom: width * 0.05
    },
    viewBodyComment: {
        height: '100%',
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.02
    },
    bodyComment: {
        backgroundColor: '#E5E5E5',
        padding: width * 0.02,
        borderTopRightRadius: width * 0.021,
        borderBottomLeftRadius: width * 0.021,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewImageComment: {
        width: width * 0.14,
        height: width * 0.14
    },
    imageComment: {
        width: '90%',
        height: '90%',
        borderRadius: (width * 0.14) / 2,
        borderWidth: 1,
        borderColor: '#808080'
    },
    textComment: {
        color: '#141414',
        fontSize: width * 0.04,
        width: width * 0.55
    },
    nameUsetCommentText: {
        color: '#E5E5E5',
        fontSize: width * 0.04,
        padding: width * 0.02
    }
});
export default styles;