import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { ListItem } from "react-native-elements";
import { Divider, Icon, Layout, TopNavigation, Text, OverflowMenu } from '@ui-kitten/components';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


export const UpcomingHolidaysScreen = ({ navigation }) => {

  const [HolidayData, setHolidayData] = useState([]);
  const [Available, SetAvailable] = useState(false);
  const [SchoolYear, SetSchoolYear] = useState("2021-2022");
  const [Region, setRegion] = useState();

  function getHolidayData() {
    axios
      .get(
        "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/" +
        SchoolYear +
        "?output=json"
      )
      .then((res) => {
        const data = res.data.content[0];
        setHolidayData(data);
        SetAvailable(true);
      });
  }

  const getRegion = async () => {
    try {
      region = await AsyncStorage.getItem("Region");
    } catch (e) {
      console.log(e);
    }
    setRegion(region);
  };

  useEffect(() => {
    getHolidayData();
    getRegion();
  }, [SchoolYear]);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='YourHolidays' alignment='center' />
      <Divider />
      <Layout style={{ flex: 1 }}>
        <View>

          <ScrollView style={{ marginTop: 5 }}>
            <Picker
              selectedValue={SchoolYear}
              onValueChange={(itemValue, itemIndex) => SetSchoolYear(itemValue)}
            >
              <Picker.Item label="2021-2022" value="2021-2022" />
              <Picker.Item label="2022-2023" value="2022-2023" />
              <Picker.Item label="2023-2024" value="2023-2024" />
            </Picker>
            {Available ? (
              HolidayData.vacations.map((d, i) => (
                <ListItem key={i} topDivider>
                  <ListItem.Content>
                    <ListItem.Title>{d.type}</ListItem.Title>
                    {d.regions.map((sd, i) =>
                      sd.region == Region ? (
                        <ListItem.Subtitle key={i}>
                          {sd.region}: {sd.startdate.slice(0, 10)} -{" "}
                          {sd.enddate.slice(0, 10)}
                        </ListItem.Subtitle>
                      ) : null || sd.region == "heel Nederland" ? (
                        <ListItem.Subtitle key={i}>
                          {sd.region}: {sd.startdate.slice(0, 10)} -{" "}
                          {sd.enddate.slice(0, 10)}
                        </ListItem.Subtitle>
                      ) : null
                    )}
                  </ListItem.Content>
                </ListItem>
              ))
            ) : (
              <Text>No data available</Text>
            )}
          </ScrollView>

        </View>
      </Layout>
    </SafeAreaView>
  );
};