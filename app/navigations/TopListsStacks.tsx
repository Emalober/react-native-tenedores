import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreen from "../screens/TopRestaurants";

const TopListScreenStack = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Los mejores restaurantes"
    })
  }
});

export default TopListScreenStack;
