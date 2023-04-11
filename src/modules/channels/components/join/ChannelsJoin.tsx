import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "@apollo/client";
import {CHANNEL_JOIN_TO_MUTATION} from "../../api/ChannelsJoinTo.api";
import {CHANNELS_LIST_SHORT_QUERY} from '../../api/ChannelsList.api';

export const ChannelsJoin = () => {
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
                    data: {
                        inviteLink: values.inviteLink
                    }
                }
            });
            resetForm();
        } catch (error) {
            console.log(error);
        }
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View>
                    <Text>Присоединиться к каналу</Text>
                    <TextInput
                        onChangeText={handleChange('inviteLink')}
                        onBlur={handleBlur('inviteLink')}
                        value={values.inviteLink}
                    />
                    {touched.inviteLink && errors.inviteLink && <Text style={{ color: 'red' }}>{errors.inviteLink.toString()}</Text>}
                    <Button
                        title={loading ? '...' : 'Присоединиться'}
                        onPress={() => handleSubmit()}
                        disabled={isSubmitting || loading}
                    />
                </View>
            )}
        </Formik>
    );
};
