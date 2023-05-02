import React, {useMemo, useState} from 'react';
import {Alert, Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from "@apollo/client";
import {REPORTS_CREATE_MUTATION} from "../api/ReportsCreate.api";
import {Picker} from '@react-native-picker/picker';
import {
    EnumPriority, EnumStatus, EnumType,
    priorityOptionsList as priorityOptions,
    statusOptionsList as statusOptions,
    typeOptionsList as typeOptions
} from "../../../common/constants/options";

type TReportsCreateFormMember = {
    id: string;
    user: {
        firstname: string;
        lastname: string;
        id: string;
    }
    role: string;
}

type TReportsCreateForm = {
    trackerId: string;
    members: TReportsCreateFormMember[];
    onClose: () => void;
    visible: boolean;
}

const ReportsCreateForm = (props: TReportsCreateForm) => {

    const {trackerId, members, onClose, visible} = props
    const [createReport] = useMutation(REPORTS_CREATE_MUTATION);

    const handleSubmit = async (values) => {
        try {
            const request = await createReport({
                variables: {
                    trackerId,
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    type: values.type,
                    status: values.status,
                    responsiblePersonId: values.responsiblePersonId
                }
            })
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка создания баг-репорта', error.message)
            }
        } finally {
            onClose()
        }


    };


    const responsiblePersonOptions = useMemo(() => {
        return members.map(memberItem => {
            return ({
                label: `${memberItem.user.firstname} ${memberItem.user.lastname}`,
                value: memberItem.id
            })
        })
    }, [members])

    const initialValues = {
        title: '',
        description: '',
        priority: EnumPriority.NORMAL,
        status: EnumStatus.FULFILMENT,
        type: EnumType.FUNCTIONALITY,
        responsiblePersonId: responsiblePersonOptions[0].value
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
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(formikProps) => (
                        <View>
                            <TextInput
                                placeholder="Title"
                                onChangeText={formikProps.handleChange('title')}
                                value={formikProps.values.title}
                            />
                            <TextInput
                                placeholder="Description"
                                onChangeText={formikProps.handleChange('description')}
                                value={formikProps.values.description}
                            />
                            <Picker
                                prompt="Select Priority"
                                selectedValue={formikProps.values.priority}
                                onValueChange={formikProps.handleChange('priority')}
                            >
                                {priorityOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                            <Picker
                                prompt="Select Status"
                                selectedValue={formikProps.values.status}
                                onValueChange={formikProps.handleChange('status')}
                            >
                                {statusOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                            <Picker
                                prompt="Select Type"
                                selectedValue={formikProps.values.type}
                                onValueChange={formikProps.handleChange('type')}
                            >
                                {typeOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>

                            <Picker
                                prompt="Select Person"
                                selectedValue={formikProps.values.responsiblePersonId}
                                onValueChange={formikProps.handleChange('responsiblePersonId')}
                            >
                                {responsiblePersonOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>

                            <Text style={{marginBottom: 10}} />

                            <TouchableHighlight onPress={() => formikProps.handleSubmit()}>
                                <Text>
                                    Создать
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
            </Modal>
        </View>
    );
};

export default ReportsCreateForm;
