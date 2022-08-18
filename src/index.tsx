import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { AddTodo, Home } from "./containers";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStore, NavigationService } from "./config";
import { Provider } from "react-redux";
import store from "./store";
import { AnyActionLoader } from "./components";
import { CommonUtils } from "./config/utils";
import { SaveActionSelector } from "./store/selectors";
import { SavedAction } from "./store/reducers/SaveActionReducer";

AppStore.setStore(store);

export type Props = {
}

const Stack = createStackNavigator();

const Root: React.FC<Props> = (props) =>
{
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App: React.FC<Props> = (props) =>
{
  const [isInternetReachable, setIsInternetReachable] = useState<boolean>(false);
  
  useEffect(() => 
  {
    const unsub = CommonUtils.addNetInfoListener((state)=>
    {
      setIsInternetReachable(state.isInternetReachable ?? false);
    });
    return unsub;
  },[]);

  useEffect(() => 
  {
    if(!isInternetReachable) return;

    dispatchAllSavedActions();
  },[isInternetReachable]);

  const dispatchAllSavedActions = () =>
  {
    const actionQueue:SavedAction[] = SaveActionSelector.selectActionsQueue(AppStore.getStore().getState());
      
    actionQueue.forEach((action:SavedAction)=>
    {
      action.cb = undefined;
      AppStore.dispatch(action)
    })
  }
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