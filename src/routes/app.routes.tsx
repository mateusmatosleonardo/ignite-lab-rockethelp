import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../screens/Details/Details";
import { Home } from "../screens/Home/Home";
import { Register } from "../screens/Register/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="New" component={Register} />
      <Screen name="Details" component={Details} />
    </Navigator>
  )
}