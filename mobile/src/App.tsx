import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";

/**
 * App Component
 *
 * This is the root component of the mobile application. It sets up the navigation
 * container and renders the main navigator for the app.
 *
 * Inputs: None
 * Outputs: Renders the navigation structure of the app.
 */
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
