import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "@apollo/client";
import {CHANNEL_JOIN_TO_MUTATION} from "../../api/ChannelsJoinTo.api";
import {CHANNELS_LIST_SHORT_QUERY} from '../../api/ChannelsList.api';
import {useNavigation} from "@react-navigation/native";

export const ChannelsJoin = () => {

    const navigation = useNavigation();

    const [joinChannel, { loading }] = useMutation(CHANNEL_JOIN_TO_MUTATION, {
        refetchQueries: [{ query: CHANNELS_LIST_SHORT_QUERY }],
    });

    const initialValues = { inviteLink: '' };

    const validationSchema = Yup.object().shape({
        inviteLink: Yup.string().required('Invite link is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await joinChannel({
                variables: {
                    inviteLink: values.inviteLink
                }
            });
            resetForm();
            Alert.alert('Вы присоединились к каналу!', '', [
                {
                    onPress: () => {
                        // @ts-ignore
                        navigation.navigate("Channels");
                    },
                    text: 'Ок'
                }
            ]);
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка присоединения к каналу', error.message)
            }
        }
        setSubmitting(false);
    };

    return (
        <View>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
                    <View>
                        <TextInput
                            placeholder={'Код приглашения'}
                            onChangeText={handleChange('inviteLink')}
                            onBlur={handleBlur('inviteLink')}
                            value={values.inviteLink}
                        />
                        {touched.inviteLink && errors.inviteLink && <Text style={{ color: 'red' }}>{errors.inviteLink.toString()}</Text>}
                        <Button
                            title={loading ? '...' : 'Присоединиться'}
                            onPress={() => handleSubmit()}
                            disabled={!isValid || isSubmitting || loading}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};
