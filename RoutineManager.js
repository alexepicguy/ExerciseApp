import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from 'react';
import Modal from 'react-native-modal';

const RoutineManager = ({
    routineManagerProp: {
        routine,
        addExercise,
    },
}) => {
    const [addExerciseOpen, setAddExerciseOpen] = useState(false);
    const togglePopup = () => {
        setAddExerciseOpen(!addExerciseOpen);
    };
    const [newName, setNewName] = useState("");
    const [newTime, setNewTime] = useState(0);
    const saveNewExercise = (exercise) => {
        addExercise(exercise);
        togglePopup();
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>
                {routine.map((exercise, id) => 
                    <Text key={id}>{id + 1}. {exercise.name}{"\n"}</Text>
                )}
                <Button title="Add Exercise to Routine" onPress={togglePopup} styles={styles.addExerciseButton} />
            </ScrollView>
            <Modal isVisible={addExerciseOpen}>
                <View style={styles.popup}>
                    <View style={{flex: 3}}>
                        <Text>Exercise Name</Text>
                        <TextInput
                            onChangeText={text => {setNewName(text)}}
                            editable
                            placeholder="Exercise Name"
                            placeholderTextColor={"grey"}
                        />
                    </View>
                    <View style={{flex: 3}}>
                        <Text>Exercise Duration</Text>
                        <TextInput 
                            onChangeText={text => {setNewTime(Number(text))}}
                            editable
                            placeholder="Exercise Duration"
                            placeholderTextColor={"grey"}
                            keyboardType="numeric"
                        />
                    </View>
                    <Button title="Save" onPress={() => saveNewExercise({name: newName, initialTime: newTime})} />
                    <Button title="Exit" onPress={togglePopup} />
                </View>
            </Modal>
        </View>
    );
}

export default RoutineManager;

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    //   borderColor: 'red',
    //   border: 10,
    },
    scrollview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'red',
        padding: 10,
    },
    addExerciseButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
    },
});