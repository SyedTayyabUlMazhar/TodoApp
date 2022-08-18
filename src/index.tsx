import React from "react";
import 'react-native-gesture-handler';
import { AddTodo, Home } from "./containers";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStore, NavigationService } from "./config";
import { Provider } from "react-redux";
import store from "./store";
import { AnyActionLoader } from "./components";

export type Props = {
}

const Stack = createStackNavigator();

const Root: React.FC<Props> = (props) =>
{
  useEffect(()=>
  {
    AppStore.setStore(store);
  }, [])

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App: React.FC<Props> = (props) =>
{
  return (
    <>
      <NavigationContainer
        ref={navigatorRef =>
        {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTodo" component={AddTodo} />
        </Stack.Navigator>
      </NavigationContainer>
      <AnyActionLoader />
    </>
  );
}

export default Root;