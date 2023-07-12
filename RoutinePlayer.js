import { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import Exercise from "./Exercise";
import RoutineManager from './RoutineManager';
import { Audio } from 'expo-av';

const RoutinePlayer = ({}) => {
    //logic to determine exercise name and time...

    const INITIAL_TIME = 2000;
    const [time, setTime] = useState(INITIAL_TIME);
    const [count, setCount] = useState(0);
    const [isLastExercise, setIsLastExercise] = useState(false);

    const [routine, setRoutine] = useState([
        {
            name: "Push Ups",
            initialTime: 1000,
        },
        {
            name: "Pull Ups",
            initialTime: INITIAL_TIME,
        },
        {
            name: "Jumping Jacks",
            initialTime: 3000,
        },
    ]);

    const addExercise = (exercise) => {
        setRoutine([...routine, exercise]);
    };

    const routineManagerProp = {
        routine,
        addExercise,
    };

    const name = routine[count].name;
    const initialTime = routine[count].initialTime;

    const [dingNext, setDingNext] = useState();
    const [dingFinal, setDingFinal] = useState();

    const playDingNext = async () => {
        console.log("loading sound");
        const { sound } = await Audio.Sound.createAsync(
            require('./assets/ding-next.mp3')
        );
        setDingNext(sound);

        console.log("playing sound")
        await sound.playAsync();
    };

    const playDingFinal = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('./assets/ding-final.mp3')
        );
        setDingFinal(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return dingNext
        ? () => { dingNext.unloadAsync(); }
        : undefined;
    }, [dingNext])

    useEffect(() => {
        return dingFinal
        ? () => { dingFinal.unloadAsync(); }
        : undefined;
    }, [dingFinal])

    useEffect(() => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
      }, [])

    const exerciseProp = {
        name,
        initialTime,
        time,
        setTime,
        isLastExercise,
    };

    const completeExercise = () => {
        const lastExerciseIndex = routine.length - 1;
        if (count < lastExerciseIndex) {
            setCount((currentCount) => { return currentCount + 1 });
            playDingNext();
        } else {
            setCount(0);
            playDingFinal();
        }
        count == lastExerciseIndex ? setIsLastExercise(true) : setIsLastExercise(false);
    };

    useEffect(() => {
        //at 100ms remaining, increment count to display correct exercise in next React cycle
        //TODO: refactor this truckery eventually but for now it works 
        if (time <= 100 && time >= 90) { completeExercise(); }
    }, [time]);

    return (
        <View style={styles.container}>
            <Exercise exerciseProp={exerciseProp}/>
            <RoutineManager routineManagerProp={routineManagerProp} />
        </View>
    );
}

export default RoutinePlayer;

const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    }
})