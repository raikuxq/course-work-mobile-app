import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import { View, Text, TextInput, Button } from 'react-native';
import * as Yup from 'yup';
import {TRACKER_CREATE_MUTATION} from "../api/TrackersCreate.api";

type TTrackersCreateForm = {
    channelId: string;
    channelCategoryId: string;
}

export const TrackersCreateForm = (props: TTrackersCreateForm) => {
    const { channelId, channelCategoryId } = props;

    console.log(channelId, channelCategoryId)

    const initialValues = {
        title: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string(),
    });

    const [createTracker] = useMutation(TRACKER_CREATE_MUTATION);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const { data } = await createTracker({
                variables: {
                    channelId,
                    channelCategoryId,
                    title: values.title,
                    description: values.description,
                },
            });
            resetForm();
            alert('Tracker created!');

            console.log('DATA___');
            console.log(data);
            console.log(data.trackerCreate);
        } catch (err) {
            console.error(err);
            alert('Error creating tracker');
        }
        setSubmitting(false);
    };

    if (!channelId || !channelCategoryId) {
        return null;
    }

    return (
        <View>
            <Text>Create a Tracker</Text>
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
                        <Button
                            onPress={() => handleSubmit()}
                            title="Submit"
                            disabled={isSubmitting}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};
