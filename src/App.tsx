import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import AuthScreen from './AuthScreen';
import Dashboard from './Dashboard';
import Setting from './Setting';
import Progress from './Progress';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
