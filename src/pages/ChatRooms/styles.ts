import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems:'center'
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
        fontSize: width * 0.07,
        fontWeight:'500',
        textAlign:'center'
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
    notMsm:{
        color:'white',
        padding: width*0.05,
        fontSize: width*0.04,
        textAlign:'center',
        width:'80%'
    }
});
export default styles;