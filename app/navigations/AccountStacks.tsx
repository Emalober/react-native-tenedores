import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/account/MyAccount";
import LoginScreen from "../screens/account/Login";
import RegisterScreen from '../screens/account/Register'

const AccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "Mi cuenta"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro"
    })
  }
});

export default AccountScreenStacks;
