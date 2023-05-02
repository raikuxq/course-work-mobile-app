import {Formik} from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/auth';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AUTH_SIGNUP_MUTATION} from "../../api/AuthSignupMutation.api";
import {VALIDATION_RULES} from "../../../../common/constants/validation";

export const AuthSignupForm = () => {
    const dispatch = useDispatch();

    const [authSignup] = useMutation(AUTH_SIGNUP_MUTATION);

    const initialValues = { email: '', password: '', confirmPassword: '', firstname: '', lastname: '' };


    const validationSchema = Yup.object({
        firstname: Yup.string()
            .required('Обязательно')
            .min(VALIDATION_RULES.FIRSTNAME.MIN, `Минимум ${VALIDATION_RULES.FIRSTNAME.MIN} символа`)
            .max(VALIDATION_RULES.FIRSTNAME.MAX,  `Максимум ${VALIDATION_RULES.FIRSTNAME.MAX} символов`),
        lastname: Yup.string()
            .required('Обязательно')
            .min(VALIDATION_RULES.LASTNAME.MIN, `Минимум ${VALIDATION_RULES.LASTNAME.MIN} символа`)
            .max(VALIDATION_RULES.LASTNAME.MAX,  `Максимум ${VALIDATION_RULES.LASTNAME.MAX} символов`),
        email: Yup.string()
            .email('Некорректный e-mail')
            .required('Обязательно'),
        password: Yup.string()
            .required('Обязательно')
            .min(VALIDATION_RULES.PASSWORD.MIN, `Минимум ${VALIDATION_RULES.PASSWORD.MIN} символов`),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], `Пароли не совпадают`)
            .required('Обязательно'),
    });

    const handleSignup = async (values) => {
        try {
            const { data } = await authSignup({
                variables: {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstname,
                    lastname: values.lastname
                },
            });
            const { accessToken, refreshToken, user } = data.authSignup;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            dispatch(setUser(user));
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка регистрации', error.message)
            }
        }
    };


    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={handleSignup} validationSchema={validationSchema}>
                {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                    <View>
                        <TextInput
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput
                            placeholder="Имя"
                            onChangeText={handleChange('firstname')}
                            onBlur={handleBlur('firstname')}
                            value={values.firstname}
                        />
                        <TextInput
                            placeholder="Фамилия"
                            onChangeText={handleChange('lastname')}
                            onBlur={handleBlur('lastname')}
                            value={values.lastname}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Пароль (мин. 8 символов)"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Подтвердите пароль"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                        <Button
                            title="Подтвердить"
                            disabled={!isValid}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}
