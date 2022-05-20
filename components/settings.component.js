import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const SettingsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [Region, setRegion] = useState(getRegion);
  const setNewRegion = async (region) => {

    setRegion(region);
    try {
      await AsyncStorage.setItem("Region", region);
    } catch (e) {
      console.log(e);
    }
  };
  const getRegion = async () => {
    try {
      region = await AsyncStorage.getItem("Region");
    } catch (e) {
      console.log(e);
    }
    setRegion(region);
  };

  getRegion();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='YourHolidays' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1 }}>
        <View style={styles.container}>

          <Picker
            selectedValue={Region}
            onValueChange={(itemValue, itemIndex) => setNewRegion(itemValue)}
          >
            <Picker.Item label="noord" value="noord" />
            <Picker.Item label="midden" value="midden" />
            <Picker.Item label="zuid" value="zuid" />
          </Picker>
        </View>
      </Layout>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    margin: 5
  }
});