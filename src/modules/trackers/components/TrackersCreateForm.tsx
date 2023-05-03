import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import {View, Text, TextInput, Button, Modal, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import * as Yup from 'yup';
import {TRACKER_CREATE_MUTATION} from "../api/TrackersCreate.api";
import {useNavigation} from "@react-navigation/native";

type TTrackersCreateForm = {
    channelId: string;
    channelCategoryId: string;
    onClose: () => void;
    visible: boolean;
}

export const TrackersCreateForm = (props: TTrackersCreateForm) => {
    const { channelId, channelCategoryId, visible, onClose } = props;

    const navigation = useNavigation();

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
            onClose()

            // @ts-ignore
            navigation.navigate('TrackerDetails', { id: data.trackerCreate.id })
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка создания трекера', error.message)
            }
        }
        setSubmitting(false);
    };

    if (!channelId || !channelCategoryId) {
        return null;
    }

    return (
        <View style={{marginTop: 50}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                }}
            >
                <SafeAreaView style={{height: '100%', flex: 1}}>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, handleChange, handleBlur, handleSubmit, values }) => (
                            <View>
                                <Text>Заголовок:</Text>
                                <TextInput
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                                <Text>Описание:</Text>
                                <TextInput
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    multiline={true}
                                />
                                <Button
                                    onPress={() => handleSubmit()}
                                    title="Подтвердить"
                                    disabled={isSubmitting}
                                />
                            </View>
                        )}
                    </Formik>

                    <TouchableOpacity
                        onPress={() => {
                            onClose()
                        }}
                    >
                        <Text>
                            Закрыть
                        </Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </Modal>
        </View>
    );
};
