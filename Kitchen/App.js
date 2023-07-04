import 'react-native-gesture-handler';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FoodScreen from "./src/components/FoodScreen";
import AddFoodScreen from "./src/components/AddFoodScreen";
import EditFoodScreen from "./src/components/EditFoodScreen";
import DeleteFoodScreen from "./src/components/DeleteFoodForm";
import Splash from "./src/screens/Splash";
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import EditProfile from "./src/screens/EditProfile";
import ChefRegisterForm from "./src/screens/Chef/ChefRegisterForm";
import ChefLoginForm from "./src/screens/Chef/ChefLoginForm";
import ChefScreen from "./src/screens/Chef/ChefScreen";
import KitchenLoginForm from "./src/screens/Kitchen/KitchenLoginForm";
import KitchenRegisterForm from "./src/screens/Kitchen/KitchenRegisterForm";
import CustomerLoginForm from "./src/screens/Customer/CustomerLoginForm";
import CustomerRegisterForm from "./src/screens/Customer/CustomerRegisterForm";
import CustomerScreen from "./src/screens/Customer/CustomerScreen";
import ChefDisplay from "./src/screens/Customer/ChefDisplay"
import ChefDetail from "./src/screens/Customer/ChefDetail";
import KitchenDetail from "./src/screens/Customer/KitchenDetail";
import CartScreen from "./src/screens/Customer/CartScreen";
import RiderRegisterForm from "./src/screens/Rider/RiderRegisterForm";
import RiderLoginForm from "./src/screens/Rider/RiderLoginForm";
import RiderScreen from "./src/screens/Rider/RiderScreen";
import PlaceOrder from "./src/screens/Customer/PlaceOrder";
import OrderPlaced from "./src/screens/Customer/OrderPlaced";
import CustomerOrder from "./src/screens/Customer/CustomerOrders"
import OrderDisplay from "./src/screens/Kitchen/OrderDisplay"
import AdminPanel from "./src/admin/AdminPanel";
import ReviewPage from "./src/screens/Customer/ReviewPage";
import ForgotPasswordForm from "./src/screens/Reset/ForgotPasswordForm";
import ForgotPasswordConfirmation from "./src/screens/Reset/ForgotPasswordConfirmation";
import { store } from "./src/store";
import { Provider } from "react-redux";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator options={{ headerShown: false }} initialRouteName="Main">

        <Stack.Screen name='Admin' component={AdminPanel} />
          <Stack.Screen name='Main' component={Splash} />
          <Stack.Screen name='PlaceOrder' component={PlaceOrder} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Signin' component={SigninScreen} />
          <Stack.Screen name='Welcome' component={FoodScreen} />

          <Stack.Screen
            name='KitchenRegister'
            component={KitchenRegisterForm}
          />
          <Stack.Screen name='KitchenLogin' component={KitchenLoginForm} />
          <Stack.Screen name='ChefRegister' component={ChefRegisterForm} />
          <Stack.Screen name='ChefLogin' component={ChefLoginForm} />
          <Stack.Screen name='ChefScreen' component={ChefScreen} />
          <Stack.Screen name='EditProfile' component={EditProfile} />

          <Stack.Screen
            name='CustomerRegister'
            component={CustomerRegisterForm}
          />
          <Stack.Screen name='CustomerLogin' component={CustomerLoginForm} />
          <Stack.Screen name='CustomerScreen' component={CustomerScreen} />
          <Stack.Screen name='ChefDisplay' component={ChefDisplay} />
          <Stack.Screen name='ChefDetail' component={ChefDetail} />
          <Stack.Screen name='KitchenDetail' component={KitchenDetail} />
          <Stack.Screen name='Review' component={ReviewPage} />
          <Stack.Screen name='CartScreen' component={CartScreen} />
          <Stack.Screen name='CustomerOrder' component={CustomerOrder} />

          <Stack.Screen 
          name='RiderRegister' 
          component={RiderRegisterForm} />
          <Stack.Screen name='RiderLogin' component={RiderLoginForm} />
          <Stack.Screen name='RiderScreen' component={RiderScreen} />
          
          <Stack.Screen name='AddFoodItem' component={AddFoodScreen} />
          <Stack.Screen name='EditFoodItem' component={EditFoodScreen} />
          <Stack.Screen name='DeleteFoodItem' component={DeleteFoodScreen} />
          <Stack.Screen name='OrderDisplay' component={OrderDisplay} />
          <Stack.Screen name='OrderPlaced' component={OrderPlaced} />

          <Stack.Screen 
          name='ForgotPassword' 
          component={ForgotPasswordForm} />
          <Stack.Screen name='ForgotPasswordConfirmation' component={ForgotPasswordConfirmation} />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;