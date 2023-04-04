    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
    import ChannelsListScreen from "./ChannelsListScreen";
    import ChannelsDetailsScreen from "./ChannelsDetailsScreen";

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
            </Stack.Navigator>
        );
    }


