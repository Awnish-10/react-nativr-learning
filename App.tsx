
import React, { useEffect } from 'react';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Counter from './src/screens/Counter';
import NewCounter from './src/screens/NewCounter';
import { setPageList } from './src/redux/action/pageList';
import UserHome from './src/screens/UsersHome';
import { ActivityIndicator } from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import ProductDetail from './src/screens/ProductDetail';
import getQueryParameters from './src/utilities/getQueryParameters';



const Stack = createStackNavigator();

function App(): JSX.Element {


  // const HandleDeepLinking = () => {
  //   const {navigate} = useNavigation()
  //   const handleDynamicLinks = async (link:any) => {
  //     console.log('Foreground link handling:', link)
  //     let productId = link.url.split('=').pop()
  //     console.log('productId:', productId,)
  //     //@ts-ignore
  //       navigate('ProductDetail', { productId: productId })
  //   }
  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
  //     return () => unsubscribe()
  //   }, [])

  //   return null
  // }

  const HandleDeepLinking = () => {
    const { navigate } = useNavigation()
    const handleDynamicLink = (link: any) => {
      console.log("dynamic link Foreground", link);
      // Handle dynamic link inside your own application
      const queryObject = getQueryParameters(link?.url)
      // console.log('queryObject',queryObject);

      if ("productId" in queryObject) {
        const productId = queryObject.productId
        // console.log('ProductId:', productId,)
        //@ts-ignore
        navigate('ProductDetail', { productId: productId })
      }
    };

    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
      // When the component is unmounted, remove the listener
      return () => unsubscribe();
    }, []);

    useEffect(() => {
      dynamicLinks()
        .getInitialLink()
        .then((link: any) => {
          console.log("dynamic link Background", link);

          const queryObject = getQueryParameters(link?.url)
          if ("productId" in queryObject) {
            const productId = queryObject.productId
            // console.log('ProductId:', productId,)
            //@ts-ignore
            navigate('ProductDetail', { productId: productId })
          }
        });
    }, []);

    return null
  }






  return (
    <NavigationContainer >
      <HandleDeepLinking />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        {/* <Stack.Screen name="Counter" component={NewCounter} /> */}
        {/* <Stack.Screen name="Counter" component={UserHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
