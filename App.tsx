import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import MainTabs from './src/navigation/MainTabs';

const App = () => {
  const user = 0; // or zustand/context etc

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};



export default App;