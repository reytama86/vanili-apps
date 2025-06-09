// MainTabs.tsx
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import { Home, Chart, Scan } from 'iconsax-react-native';
import HomeStack, { HomeStackParamList } from './HomeStack';
import ReadSoil from './components/Main/ReadSoil/ReadSoil';
import ChartMain from './components/Main/Chart/ChartMain';

export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ReadSoil: undefined;
  ChartMain: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const nested = getFocusedRouteNameFromRoute(route) ?? 'HomeFix';
      const hideTabBar = route.name === 'HomeStack' && nested !== 'HomeFix';
      return {
        headerShown: false,
        tabBarStyle: hideTabBar ? { display: 'none' } : { height: 71 },
        tabBarShowLabel: !hideTabBar,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarActiveTintColor: '#B4DC45',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'HomeStack') {
            return <Home color={focused ? '#B4DC45' : color} variant="Bold" size={size} />;
          }
          if (route.name === 'ReadSoil') {
            return (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#B4DC45',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Scan color="white" variant="Linear" size={20} />
              </View>
            );
          }
          return <Chart color={focused ? '#B4DC45' : color} variant="Linear" size={size} />;
        },
      };
    }}
  >
    <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('HomeStack', { screen: 'HomeFix' });
          },
        })}
      />
    <Tab.Screen name="ReadSoil" component={ReadSoil} options={{ tabBarLabel: '' }} />
    <Tab.Screen name="ChartMain" component={ChartMain} options={{ tabBarLabel: 'History' }} />
  </Tab.Navigator>
);

export default MainTabs;
