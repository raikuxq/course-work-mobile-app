import React, {useMemo, useState} from 'react';
import {Alert, Button, Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
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
import {useNavigation} from "@react-navigation/native";

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
    const navigation = useNavigation();

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

            const {data} = request

            if (data.createReport) {
                // @ts-ignore
                navigation.navigate('IssueReportDetails', {id: data.createReport.id})
            }

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
        return members
            .filter((obj, index, self) => index === self.findIndex((t) =>
                (t.user?.firstname === obj.user?.firstname) &&
                (t.user?.lastname === obj.user?.lastname) &&
                (t.role === obj.role)
            ))
            .map(memberItem => {
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
                                placeholder="Название"
                                onChangeText={formikProps.handleChange('title')}
                                value={formikProps.values.title}
                            />
                            <TextInput
                                placeholder="Описание"
                                onChangeText={formikProps.handleChange('description')}
                                value={formikProps.values.description}
                            />
                            <Picker
                                prompt="Выберите приоритет"
                                selectedValue={formikProps.values.priority}
                                onValueChange={formikProps.handleChange('priority')}
                            >
                                {priorityOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value}/>
                                ))}
                            </Picker>
                            <Picker
                                prompt="Выберите статус"
                                selectedValue={formikProps.values.status}
                                onValueChange={formikProps.handleChange('status')}
                            >
                                {statusOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value}/>
                                ))}
                            </Picker>
                            <Picker
                                prompt="Выберите тип"
                                selectedValue={formikProps.values.type}
                                onValueChange={formikProps.handleChange('type')}
                            >
                                {typeOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value}/>
                                ))}
                            </Picker>

                            <Picker
                                prompt="Выберите ответственного"
                                selectedValue={formikProps.values.responsiblePersonId}
                                onValueChange={formikProps.handleChange('responsiblePersonId')}
                            >
                                {responsiblePersonOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value}/>
                                ))}
                            </Picker>

                            <Text style={{marginBottom: 10}}/>

                            <Button
                                onPress={() => formikProps.handleSubmit()}
                                title={'Создать'}
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
            </Modal>
        </View>
    );
};

export default ReportsCreateForm;
