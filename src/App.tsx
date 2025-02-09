import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import AuthScreen from './AuthScreen';
import Dashboard from './Dashboard';
import Setting from './Setting';
import Progress from './Progress';
import Explore from './Explore';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useFonts } from './useFonts';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Progress" component={Progress} />
            <Stack.Screen 
              name="Explore" 
              component={Explore}
              options={{
                headerShown: false
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
