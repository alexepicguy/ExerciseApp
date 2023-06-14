import {useState,useEffect} from 'react'
import {View,StyleSheet} from 'react-native';
import Controls from './Controls';
import Time from './Time';

const StopClock = ({initialTime = 30000, time, setTime, isLastExercise}) => {
    // -1: stopped, 0: paused, 1: playing
    const [status, setStatus] = useState(-1);

    const reset = () => {
        setTime(initialTime);
    }
    const handleStart = () => {
        setStatus(1);
    }
    const handlePause = () => {
        setStatus(status === 0 ? 1 : 0);
    }
    const handleStop = () => {
        setStatus(-1);
    }

    useEffect(() => {
        let timerID;
        if (status === 1) {
            timerID = setInterval(() => {
                setTime((time) => time - 100);
            }, 100) //need to lower the interval, but it slows down the count
        } else {
            clearInterval(timerID);
            if (status === -1) { reset(); }
        }
        return () => {clearInterval(timerID);}
        
    }, [status]);

    useEffect(() => {
        if (time <= 0) {
            reset();
            isLastExercise ? handleStop() : "";
        }
    }, [time]);

    return(
        <View style={styles.container}>
            <Time time={time} />
            <Controls
                status={status}
                handleStart={handleStart}
                handlePause={handlePause}
                handleStop={handleStop}
            />
        </View>
    )
}

export default StopClock;

const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'
    },
})