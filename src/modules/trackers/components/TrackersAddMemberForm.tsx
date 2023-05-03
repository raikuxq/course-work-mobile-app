import React, {useMemo} from 'react';
import {Alert, Modal, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from "@apollo/client";
import {TRACKER_ADD_MEMBER_MUTATION} from "../api/TrackersAddMember.api";
import {Picker} from '@react-native-picker/picker';
import { EnumRole, roleOptionsList as roleOptions } from "../../../common/constants/options";

type TTrackersAddMemberFormMember = {
    id: string;
    lastname: string;
    firstname: string;
    role: string;
}

type TTrackersAddMemberForm = {
    trackerId: string;
    members: TTrackersAddMemberFormMember[];
    onClose: () => void;
    visible: boolean;
}

const TrackersAddMemberForm = (props: TTrackersAddMemberForm) => {

    const {trackerId, members, onClose, visible} = props
    const [trackerAddMember] = useMutation(TRACKER_ADD_MEMBER_MUTATION);

    const handleSubmit = async (values) => {
        try {
            const request = await trackerAddMember({
                variables: {
                    trackerId,
                    role: values.role,
                    userId: values.userId
                }
            })
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка добавления пользователя', error.message)
            }
        } finally {
            onClose()
        }


    };


    const userOptions = useMemo(() => {
        return members.map(memberItem => {
            return ({
                label: `${memberItem.firstname} ${memberItem.lastname}`,
                value: memberItem.id
            })
        })
    }, [members])

    const initialValues = {
        role: EnumRole.DEV,
        userId: userOptions?.[0].value
    };

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

                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {(formikProps) => (
                            <View>
                                <Picker
                                    prompt="Выберите статус"
                                    selectedValue={formikProps.values.role}
                                    onValueChange={formikProps.handleChange('role')}
                                >
                                    {roleOptions.map((option) => (
                                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                                    ))}
                                </Picker>

                                <Picker
                                    prompt="Выберите участника"
                                    selectedValue={formikProps.values.userId}
                                    onValueChange={formikProps.handleChange('userId')}
                                >
                                    {userOptions.map((option) => (
                                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                                    ))}
                                </Picker>

                                <Text style={{marginBottom: 10}} />

                                <TouchableHighlight onPress={() => formikProps.handleSubmit()}>
                                    <Text>
                                        Добавить пользователя
                                    </Text>
                                </TouchableHighlight>
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

export default TrackersAddMemberForm;
