import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/auth';
import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AUTH_LOGIN_MUTATION} from "../../api/AuthLoginMutation.api";
import {VALIDATION_RULES} from "../../../../common/constants/validation";

export const AuthLoginForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [authLogin, { loading, error }] = useMutation(AUTH_LOGIN_MUTATION);
    const [accessToken, setAccessToken] = useState(null);

    const initialValues = {email: '', password: ''};

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Некорректный e-mail')
            .required('Обязательно'),
        password: Yup.string()
            .required('Обязательно')
            .min(VALIDATION_RULES.PASSWORD.MIN, `Минимум ${VALIDATION_RULES.PASSWORD.MIN} символов`),    });

    const handleLogin = async (values) => {
        try {
            const { data } = await authLogin({
                variables: {
                    email: values.email,
                    password: values.password
                },
            });
            const {accessToken, refreshToken, user} = data.authLogin;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            dispatch(setUser(user));
            // @ts-ignore
            navigation.navigate("Channels");
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowToken = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        setAccessToken(token);
    };

    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                        <TextInput
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Пароль"
                            onChangeText={handleChange('password')}

                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Button
                            title="Войти"
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}
