import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, Text, Card } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const NextHolidayScreen = ({ navigation }) => {

    const navigateBack = () => {
      navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );
    
    const [HolidayData, setHolidayData] = useState([]);
    const [Available, SetAvailable] = useState(false);
  
    function getHolidayData() {
      axios
        .get(
          "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
        )
        .then((res) => {
          const data = {};
          let dataSet = false;
          res.data.content[0].vacations.forEach((element) => {
            let ans = calculateDays(element.regions[0].startdate);
            if (dataSet) {
              return;
            }
            if (ans <= 0) {
              return;
            }
            data.type = element.type;
            data.regions = element.regions;
            data.daysToGo = ans;
            dataSet = true;
          });
          console.log(data);
          setHolidayData(data);
          SetAvailable(true);
        });
    }
  
    useEffect(() => {
      getHolidayData();
    }, []);
  
    function calculateDays(date) {
      const date1 = new Date();
      const date2 = new Date(date);
      return Math.floor((date2 - date1) / 1000);
    }
  
    return (
    <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='YourHolidays' alignment='center' accessoryLeft={BackAction}/>
        <Divider/>
        <Layout style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.container}>              
              <Card>
              {Available ? (
                  <CountDown
                      until={HolidayData.daysToGo - 60 * 60 * 24}
                      digitStyle={{backgroundColor: '#FFF'}}
                      onFinish={() => alert("Enjoy your holiday!")}
                      size={20}
                  />
              ):(
                  <Text>No data available</Text>
              )}
              </Card>
              <Text style={styles.text} appearance='hint'>
                  Keep track on the upcoming holiday with this countdown, excited yet? Stay tuned!
              </Text>
          </View>
        </Layout>
    </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
      margin: 15
    },
    text: {
      marginTop: 40
    }
});