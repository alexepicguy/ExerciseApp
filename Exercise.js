import { StyleSheet, Text, View } from 'react-native';
import Stopclock from "./Stopclock";

const Exercise = ({
    exerciseProp: {
        name,
        initialTime,
        time,
        setTime,
        isLastExercise,
    },
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Stopclock initialTime={initialTime} time={time} setTime={setTime} isLastExercise={isLastExercise}/>
        </View>
    );
}

export default Exercise;

const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'
    },
    name: {
        fontSize: 48,
        marginBottom: 30,
    }
})