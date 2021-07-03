import React from 'react';
import MainNavigation from 'navigations';
import {Provider} from 'react-redux';
import {store, persistedStore} from 'redux/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import { Text } from 'react-native';
// import {Text, Block, Button, TextField, ActivitySign} from 'components';


export default App = () => {
  enableScreens()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
      <MainNavigation />
       </PersistGate>
     </Provider>
    );
};
