import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {Provider as MovieProvider} from './src/context/MoviesContext';
import {Provider as CinemaProvider} from './src/context/CinemaContext';
import {Provider as AuthProvider} from './src/context/AuthContext';
import FetchData from './src/components/shared/FetchData';
import Toast, {BaseToast} from 'react-native-toast-message';
import {FONTS} from './src/constants/theme';
import SplashScreen from 'react-native-splash-screen';
import {Settings} from 'react-native-fbsdk-next';
import codePush from 'react-native-code-push';

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    Settings.initializeSDK();
    SplashScreen.hide();
    // Ask for consent first if necessary
    // Possibly only do this for iOS if no need to handle a GDPR-type flow
  }, []);

  const toastConfig = {
    error: ({text1, text2, props, ...rest}) => (
      <BaseToast
        {...rest}
        onLeadingIconPress={() => Toast.hide()}
        onTrailingIconPress={() => Toast.hide()}
        onPress={() => Toast.hide()}
        style={{borderLeftColor: '#FE6301', height: 100}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          ...FONTS.h2,
        }}
        text2Style={{
          ...FONTS.h3,
        }}
        text1={text1}
        text2={text2}
      />
    ),

    my_custom_type: ({text1, props, ...rest}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
      </View>
    ),
  };

  return (
    <CinemaProvider>
      <MovieProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" />
          <FetchData />
          <BottomTabNavigator />
          <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
        </AuthProvider>
      </MovieProvider>
    </CinemaProvider>
  );
};

export default codePush(App);
