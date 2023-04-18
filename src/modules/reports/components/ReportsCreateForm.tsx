import React, {useMemo, useState} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from "@apollo/client";
import {REPORTS_CREATE_MUTATION} from "../api/ReportsCreate.api";
import {Picker} from '@react-native-picker/picker';

type TReportsCreateFormMember = {
    firstname: string;
    lastname: string;
    id: string;
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

    const initialValues = {
        title: '',
        description: '',
        priority: '',
        status: '',
        type: '',
        responsiblePersonId: ''
    };

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            await createReport({
                variables: {
                    trackerId,
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    type: values.type,
                    responsiblePersonId: values.responsiblePersonId
                }
            })
        } finally {
            onClose()
        }


    };

    const priorityOptions = [
        {label: 'Критический', value: 'CRITICAL'},
        {label: 'Высокий', value: 'HIGH'},
        {label: 'Низкий', value: 'LOW'},
        {label: 'Обычный', value: 'NORMAL'},
    ];

    const statusOptions = [
        {label: 'Закрыто', value: 'CLOSED'},
        {label: 'Обсуждение', value: 'DISCUSSION'},
        {label: 'Выполнение', value: 'FULFILMENT'},
        {label: 'Готово', value: 'READY'},
        {label: 'На утверждении', value: 'TO_APPROVE'},
    ];

    const typeOptions = [
        {label: 'Функциональность', value: 'FUNCTIONALITY'},
        {label: 'Отчетность', value: 'REPORTING'},
        {label: 'Интерфейс', value: 'UI'},
        {label: 'Уязвимость', value: 'VULNERABILITY'},
    ];

    const responsiblePersonOptions = useMemo(() => {
        return members.map(memberItem => {
            return ({
                label: `${memberItem.firstname} ${memberItem.lastname}`,
                value: memberItem.id
            })
        })
    }, [members])

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
                            <TouchableHighlight onPress={() => formikProps.handleSubmit()}>
                                <Text>Создать</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    onClose()
                                }}
                            >
                                <Text>Закрыть</Text>
                            </TouchableHighlight>
                        </View>
                    )}
                </Formik>

                <TouchableHighlight
                    onPress={() => {
                        onClose()
                    }}
                >
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </Modal>
        </View>
    );
};

export default ReportsCreateForm;
