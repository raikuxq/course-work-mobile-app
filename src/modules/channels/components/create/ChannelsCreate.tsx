import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import { View, Text, TextInput, Button } from 'react-native';
import * as Yup from 'yup';
import { CHANNEL_CREATE_MUTATION } from '../../api/ChannelsCreate.api';

export const ChannelsCreate = () => {
    const [createChannel] = useMutation(CHANNEL_CREATE_MUTATION);

    const initialValues = {
        title: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await createChannel({
                variables: {
                    title: values.title,
                    description: values.description,
                },
            });
            resetForm();
            alert('Channel created!');
        } catch (err) {
            console.error(err);
            alert('Error creating channel');
        }
        setSubmitting(false);
    };

    return (
        <View>
            <Text>Create a Channel</Text>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text>Title</Text>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                        <Text>Description</Text>
                        <TextInput
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            multiline={true}
                        />
                        <Button onPress={() => handleSubmit()} title="Submit" disabled={isSubmitting} />
                    </View>
                )}
            </Formik>
        </View>
    );
};