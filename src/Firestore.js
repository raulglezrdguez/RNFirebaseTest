import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AddDocuments from './screens/firestore/AddDocuments';
import FilterDocuments from './screens/firestore/FilterDocuments';

import CloudAddIcon from './components/CloudAddIcon';
import FilterIcon from './components/FilterIcon';

const Tab = createMaterialTopTabNavigator();

function FirestoreTabs() {
  const createScreenOptions = ({route}) => ({
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color}) => {
      if (route.name === 'AddDocuments') {
        return <CloudAddIcon width={20} height={20} stroke={color} />;
      }
      if (route.name === 'FilterDocuments') {
        return <FilterIcon width={20} height={20} stroke={color} />;
      }
      return null;
    },
  });

  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="AddDocuments" component={AddDocuments} />
      <Tab.Screen name="FilterDocuments" component={FilterDocuments} />
    </Tab.Navigator>
  );
}

export default FirestoreTabs;
