import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as Yup from 'yup';
import { CHANNEL_CREATE_MUTATION } from '../../api/ChannelsCreate.api';
import { CHANNEL_CREATE_CATEGORY_MUTATION } from "../../api/ChannelsCreateCategory.api";
import {useNavigation} from "@react-navigation/native";

export const ChannelsCreate = () => {

    const navigation = useNavigation();

    const [createChannel] = useMutation(CHANNEL_CREATE_MUTATION);
    const [createChannelCategory] = useMutation(CHANNEL_CREATE_CATEGORY_MUTATION);

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
            const { data } = await createChannel({
                variables: {
                    title: values.title,
                    description: values.description,
                },
            });
            resetForm();

            const { id: channelId } = data.channelCreate

            if (channelId) {
                const { data } = await createChannelCategory({
                    variables: {
                        title: 'Main',
                        channelId: channelId,
                    },
                });

                Alert.alert('Канал создан!', '', [
                    {
                        onPress: () => {
                            // @ts-ignore
                            navigation.navigate("Channels");
                        },
                        text: 'Ок'
                    }
                ]);
            }
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка создания канала', error.message)
            }
        }
        setSubmitting(false);
    };

    return (
        <View>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            placeholder={'Заголовок'}
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                        <TextInput
                            placeholder={'Описание'}
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            multiline={true}
                        />
                        <Button onPress={() => handleSubmit()} title="Подтвердить" disabled={isSubmitting} />
                    </View>
                )}
            </Formik>
        </View>
    );
};
