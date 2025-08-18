import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import ReportForm from "../screens/ReportForm";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ReportForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ReportForm" component={ReportForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
