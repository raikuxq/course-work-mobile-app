import {Formik} from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/auth';
import {useMutation} from '@apollo/client';
import SyncStorage from 'react-native-sync-storage';
import {AUTH_LOGIN_MUTATION} from "../../api/AuthLoginMutation.api";

export const AuthLoginForm = () => {
    const dispatch = useDispatch();
    const [authLogin, { data, loading, error }] = useMutation(AUTH_LOGIN_MUTATION);

    const initialValues = {email: '', password: ''};

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleLogin = async (values) => {
        console.log('handleLogin called')
        console.log(values)
        try {
            await authLogin({
                variables: {
                    email: values.email,
                    password: values.password
                },
            });
            const {accessToken, user} = data.authLogin;
            await SyncStorage.setItem('accessToken', accessToken);
            dispatch(setUser(user));
        } catch (error) {
            console.log(error);
        }
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
                    </View>
                )}
            </Formik>
        </View>
    );
}
