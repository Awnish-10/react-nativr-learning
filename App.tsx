
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
// import PushNotification from './src/screens/PushNotification';
import { PermissionsAndroid } from 'react-native';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NotificationListner, requestUserPermission } from './src/utilities/pushnotificationHelper';

const Stack = createStackNavigator();

function App(): JSX.Element {
  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationListner()
  // }, [])

  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
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



  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async
  //   remote Message => {
  //   console.log('Message handled in the background!', remote Message);
  //   })
  //   const unsubscribe = messaging().on Message(async remote Message => {
  //   Alert.alert('A new FCM message arrived!", JSON.stringify(remote Message));
  //   console.log(remoteMessage)
  //   });
  //   return unsubscribe;
  //   }, []);



  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(remoteMessage, "remote")
      // const data=await getarticlebyid(remoteMessage.data.articleId);
      // console.log(data,"article")
      // navigate(routes.SINGLEFEED,{item:data?.data})
    });

    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage
          );
          //     const data=await getarticlebyid(remoteMessage.data.articleId);
          // console.log(data,"article")
          // navigate(routes.SINGLEFEED,{item:data?.data})
        }
      })

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
    const fcmtoken = await messaging().getToken();
    console.log("fcmtoken",fcmtoken);
    
  }
  useEffect(() => {
    requestUserPermission()

  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // const data = await getarticlebyid(remoteMessage.data.articleId);
    // navigate(routes.SINGLEFEED, { item: data?.data })
  });
  return (
    <NavigationContainer >
      <HandleDeepLinking />
      <Stack.Navigator>
        {/* <Stack.Screen name="PushNotification" component={PushNotification} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />

        {/* <Stack.Screen name="Counter" component={NewCounter} /> */}
        {/* <Stack.Screen name="Counter" component={UserHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
