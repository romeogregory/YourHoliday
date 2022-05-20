import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Divider, Icon, Layout, TopNavigation } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const UpcomingHolidaysScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='YourHolidays' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.container}>
              
        </View>
      </Layout>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    margin: 40
  }
});