// //Import React
// import React from 'react';

// //Import Navigators from React Navigation
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// import Login from './Login';
// import Register from './Register';
// import NavHome from '../NavHome';


// const Auth = createStackNavigator({
//     //Stack Navigator for Login and Sign up Screen
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     Register: {
//       screen: Register,
//       navigationOptions: {
//         title: 'Register',
//         headerStyle: {
//           backgroundColor: '#307ecc',
//         },
//         headerTintColor: '#fff',
//       },
//     },
//   });

//   export default AppContainer = createAppContainer(
//     createSwitchNavigator(
//       {        
//         App: NavHome,
//         Auth: Auth,
//       }     
//     )
//   );