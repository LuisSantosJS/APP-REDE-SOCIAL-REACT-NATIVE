import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        justifyContent: 'space-between'
    },
    avatar: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: ((width * 0.1) / 2),
        borderWidth: width * 0.002,
        right: width * 0.03,
        borderColor: 'white'
    },
    name: {
        fontSize: width * 0.04,
        fontWeight: "500",
        color: "#FFF"
    },
    timestamp: {
        fontSize: width * 0.025,
        color: "#C4C6CE",
    },
    containerPost: {
        flex: 1,
        maxHeight: undefined
    },
    description: {
        width: width,
        minHeight: width * 0.1,
        maxHeight: undefined
    },
    descriptionText: {
        color: 'white',
        fontWeight: '500',
        paddingHorizontal: width * 0.02,
        padding: width * 0.02,
        textAlign: "left",
        justifyContent: 'space-between'
    },
    imagePost: {
        width: width,
    },
    downViewPost: {
        width: width,
        minHeight: 70,
        maxHeight: undefined,
        justifyContent: 'space-between',
        alignContent: "center",
        flexDirection: 'row'
    },
    mommentPost: {
        color: 'white',
        fontSize: width * 0.03

    },
    containerAvatarNamePost: {
        flexDirection: "row",
        alignItems: "center",
        width: '40%',
        paddingHorizontal: width * 0.05,
        justifyContent: 'flex-start'
    },
    containerButtonsEndViewPost: {
        flexDirection: "row",
        alignItems: "center",
        width: '40%',
        justifyContent: 'space-evenly'
    },
    header: {
        height: width * 0.17,
        width: width,
        left: 0, right: 0,
        backgroundColor: '#191919'
    },
    textHeader: {
        color: 'white',
        fontSize: width * 0.05
    },
    headerTextContainer: {
        height: '100%',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIconContainer: {
        height: '100%',
        flexDirection: 'row-reverse',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    containerOptions:{
        width: '100%',
        height: width*0.4,
        justifyContent :'space-around',
        alignItems: 'center'
    },
    submit:{
        width: '70%',
        height: width*0.135,
        backgroundColor: 'green',
        borderRadius: width*0.02,
        alignItems:'center',
        justifyContent: 'center'
    },
    textSubmit:{
        color: 'white',
        fontSize: width*0.06
    },
});
export default styles;