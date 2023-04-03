import {Formik} from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/auth';
import {useMutation} from '@apollo/client';
import SyncStorage from 'react-native-sync-storage';
import {AUTH_SIGNUP_MUTATION} from "../../api/AuthSignupMutation.api";

export const AuthSignupForm = () => {
    const dispatch = useDispatch();

    const [authSignup] = useMutation(AUTH_SIGNUP_MUTATION);

    const initialValues = { email: '', password: '', confirmPassword: '' };


    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const handleSignup = async (values) => {
        try {
            console.log('request sent', values)
            const { data } = await authSignup({
                variables: {
                    email: values.email,
                    password: values.password,
                    firstname: 'John',
                    lastname: 'Doe'
                },
            });
            console.log('request finished')
            console.log(data)
            const { accessToken, user } = data.authSignup;
            await SyncStorage.setItem('accessToken', accessToken);
            dispatch(setUser(user));
            console.log(user)
        } catch (error) {
            console.log('request error')
            console.log(error);
            throw error
        }
    };


    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={handleSignup} validationSchema={validationSchema}>
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
                        <TextInput
                            secureTextEntry
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                        <Button
                            title="Sign up"
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}
