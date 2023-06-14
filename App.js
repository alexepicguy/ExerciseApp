import { StyleSheet,  View } from 'react-native';
import RoutinePlayer from './RoutinePlayer';

export default function App() {

  return (
    <View style={styles.container}>
      <RoutinePlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
