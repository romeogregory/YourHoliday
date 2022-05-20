import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const AboutScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='YourHolidays' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.container}>
            <Text style={styles.text} appearance='hint'>
                YourHolidays is a application where you can keep track of upcoming school holidays, this way you will never miss out on any upcoming holidays!
            </Text>
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