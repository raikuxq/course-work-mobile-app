    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
    import ChannelsListScreen from "./ChannelsListScreen";
    import ChannelsDetailsScreen from "./ChannelsDetailsScreen";
    import TrackersDetailsScreen from "../../trackers/routes/TrackersDetailsScreen";

    const Stack = createStackNavigator();

    export default function ChannelsScreen({ navigation, route }) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="ChannelsList"
                    component={ChannelsListScreen}
                />
                <Stack.Screen
                    name="ChannelDetails"
                    component={ChannelsDetailsScreen}
                    /** @ts-ignore */
                    options={({ route }) => ({ id: route.params.id })}
                />
                <Stack.Screen
                    name="TrackerDetails"
                    component={TrackersDetailsScreen}
                    /** @ts-ignore */
                    options={({ route }) => ({ id: route.params.id })}
                />
            </Stack.Navigator>
        );
    }


