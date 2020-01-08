import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/restaurants/Restaurants";
import AddRestaurant from "../screens/restaurants/AddRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes"
    })
  },
  AddRestaurant: {
    screen: AddRestaurant,
    navigationOptions: () => ({
      title: "Agregar restaurant"
    })
  }
});

export default RestaurantsScreenStacks;
