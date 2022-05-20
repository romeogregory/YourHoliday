import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './settings.component';
import { AboutScreen } from './about.component';
import { NextHolidayScreen } from './nextHoliday.component';
import { UpcomingHolidaysScreen } from './upcomingHolidays.component';
import { BottomNavigation, BottomNavigationTab, Icon  } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
);

const ClockIcon = (props) => (
    <Icon {...props} name='clock-outline'/>
);

const SettingsIcon = (props) => (
    <Icon {...props} name='settings-outline'/>
);

const HeartIcon = (props) => (
    <Icon {...props} name='heart-outline'/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={CalendarIcon} />
    <BottomNavigationTab icon={ClockIcon} />
    <BottomNavigationTab icon={HeartIcon} />
    <BottomNavigationTab icon={SettingsIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Upcoming Holidays' icon={CalendarIcon} component={UpcomingHolidaysScreen}/>
    <Screen name='Until Next Holiday'  icon={ClockIcon} component={NextHolidayScreen}/>
    <Screen name='About Us'  icon={HeartIcon} component={AboutScreen}/>
    <Screen name='Settings'  icon={SettingsIcon} component={SettingsScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);
