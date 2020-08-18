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
        backgroundColor: '#191919'
    },
    buttomHeader: {
        width: width * 0.1,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ((width * 0.1) / 2),
        backgroundColor: 'white'
    },
    textHeader: {
        color: 'white',
        fontSize: width * 0.07
    },
    headerTextContainer: {
        height: '100%',
        width: '50%',
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
    avatar: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: ((width * 0.1) / 2),
        borderWidth: width * 0.002,

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
    contentContainerStyle: {
        padding: 16,
        backgroundColor: '#F3F4F9',
    },
    item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelHandle: {
        width: 40,
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4
    },
    containerAvatarNamePost: {
        flexDirection: "row",
        alignItems: "center",
        width: '44%',
        paddingHorizontal: width * 0.03,
        justifyContent: 'space-between'
    },
    containerButtonsEndViewPost: {
        flexDirection: "row",
        alignItems: "center",
        width: '40%',
        justifyContent: 'space-evenly'
    },
    inputSearch: {
        height: '55%',
        width: '95%',
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: width * 0.03,
        paddingHorizontal: width * 0.03
    },
    headerModal: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },





  
    headerProfile: {
        width: '100%',
        height: height * 0.2,
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        backgroundColor: '#191919',
        justifyContent: 'space-between'
    },
    containerProfile: {
        height: '100%',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        height: width * 0.3,
        width: width * 0.3,
        borderRadius: ((width * 0.3) / 2),
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white'
    },
    backButtom: {
        width: '20%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    backButtomNavigator: {
        height: width * 0.11,
        width: width * 0.11,
        borderRadius: ((width * 0.11) / 2),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        width: '40%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.02
    },
    textInfoName: {
        textAlign: 'auto',
        fontWeight: '400',
        color: 'white',
        fontSize: width * 0.055
    },
    textInfoPubCox: {
        textAlign: 'justify',
        fontWeight: '200',
        color: 'white',
        fontSize: width * 0.04
    },
    containerModalProfile: {
        width: width * 0.8,
        height: width * 0.8+((width * 0.8)*0.2),
        backgroundColor: '#191919',
        borderRadius: width * 0.04,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-around'
    },
    containerViewModalFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerModalProfile: {
        width: '100%',
        height: '20%',
        paddingHorizontal: width * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarModalProfile: {
        width: '100%',
        height: '80%',
        borderRadius: width * 0.04,
    },


});
export default styles;