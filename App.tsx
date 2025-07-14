import { NavigationContainer } from '@react-navigation/native';
import useAuth from './src/store/useAuth';
import AuthStack from './src/navigation/AuthStack';
import MainTabs from './src/navigation/MainTabs';

const App = () => {
  const user = useAuth(); // or zustand/context etc

  return (
    <NavigationContainer>
      {user.isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};



export default App;