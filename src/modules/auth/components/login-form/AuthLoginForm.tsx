import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/auth';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AUTH_LOGIN_MUTATION} from "../../api/AuthLoginMutation.api";

export const AuthLoginForm = () => {
    const dispatch = useDispatch();
    const [authLogin, { loading, error }] = useMutation(AUTH_LOGIN_MUTATION);
    const [accessToken, setAccessToken] = useState(null);

    const initialValues = {email: '', password: ''};

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleLogin = async (values) => {
        console.log('handleLogin called')
        console.log(values)
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
                            placeholder="Password"
                            onChangeText={handleChange('password')}

                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Button
                            title="Log In"
                            onPress={() => handleSubmit()}
                        />

                        <Button
                            title="Show Token"
                            onPress={() => handleShowToken()}
                        />
                        {accessToken && (
                            <Text>{accessToken}</Text>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    );
}
