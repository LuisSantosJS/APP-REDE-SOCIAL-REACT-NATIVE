import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    input: {
        width: '70%',
        height: width * 0.13,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 10,
        borderWidth: width * 0.002,
        borderColor: 'grey',
        paddingLeft: 5,
        borderRadius: ((width * 0.05) / 2)
    },
    containerViewInputs: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    viewProfile: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: (width * 0.4) / 2,
        borderWidth: width*0.007,
        borderColor: 'white',
    },
    containerItemsView:{
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'space-around'

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
    textRee:{
        color: 'white',
        fontSize: width*0.04
    }
});
export default styles;