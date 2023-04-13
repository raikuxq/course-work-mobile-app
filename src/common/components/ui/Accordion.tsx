import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';

const Accordion = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={toggleCollapsed}>
                <Text style={{ fontSize: 18 }}>Accordion Header</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                <Text style={{ fontSize: 16 }}>
                    Accordion Content
                </Text>
            </Collapsible>
        </View>
    );
};

export default Accordion;
