import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Select, IndexPath, SelectItem  } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const SettingsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const [Region, setRegion] = useState(getRegion);
  const setNewRegion = async (region) => {
    setRegion(region);
    try {
      await AsyncStorage.setItem("Region", region);
    } catch (e) {
      console.log(e);
    }
    console.log(region);
  };
  const getRegion = async () => {
    try {
      region = await AsyncStorage.getItem("Region");
    } catch (e) {
      console.log(e);
    }
    setRegion(region);
    // return region;
  };
  getRegion();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='YourHolidays' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1 }}>
        <View style={styles.container}>
            <Select
                selectedIndex={Region}
                onSelect={index => setNewRegion(index)}
                label='Select your region'>
                <SelectItem title='North' value="noord" />
                <SelectItem title='South' value="zuid"/>
                <SelectItem title='West' value="west"/>
            </Select>
        </View>
      </Layout>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
    container: {
      margin: 30
    }
});