import React, {useMemo, useState} from 'react';
import {
    Alert,
    Button,
    Modal, SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from "@apollo/client";
import {REPORTS_UPDATE_MUTATION} from "../api/ReportsUpdate.api";
import {Picker} from '@react-native-picker/picker';
import {
    EnumPriority, EnumStatus, EnumType,
    priorityOptionsList as priorityOptions,
    statusOptionsList as statusOptions,
    typeOptionsList as typeOptions
} from "../../../common/constants/options";

type TReportsUpdateFormInitialValues = {
    title: string;
    description: string;
    priority: EnumPriority;
    status: EnumStatus;
    type: EnumType;
    responsiblePersonId: string;
};

type TReportsUpdateFormMember = {
    id: string;
    user: {
        firstname: string;
        lastname: string;
        id: string;
    }
    role: string;
}

type TReportsUpdateForm = {
    issueReportId: string;
    members: TReportsUpdateFormMember[];
    onClose: () => void;
    visible: boolean;
    initialValues: TReportsUpdateFormInitialValues;
}

const ReportsUpdateForm = (props: TReportsUpdateForm) => {

    const {issueReportId, members, onClose, visible, initialValues: initialValuesProp} = props
    const [updateReport] = useMutation(REPORTS_UPDATE_MUTATION);

    const handleSubmit = async (values) => {
        try {
            await updateReport({
                variables: {
                    issueReportId,
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    type: values.type,
                    status: values.status,
                    responsiblePersonId: values.responsiblePersonId
                }
            })

            Alert.alert('Баг-репорт успешно обновлен')
        } catch (error) {
            const alertMessage = error?.extensions?.message ?? error?.message

            if (alertMessage) {
                Alert.alert('Ошибка обновления баг-репорта', error.message)
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
        title: initialValuesProp?.title || '',
        description: initialValuesProp?.description || '',
        priority: initialValuesProp?.priority || EnumPriority.NORMAL,
        status: initialValuesProp?.status || EnumStatus.FULFILMENT,
        type: initialValuesProp?.type || EnumType.FUNCTIONALITY,
        responsiblePersonId: initialValuesProp?.responsiblePersonId || responsiblePersonOptions[0].value
    };

    return (
        <View style={{marginTop: 50}}>
            <ScrollView>
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
                                        prompt="Выбери ответственного"
                                        selectedValue={formikProps.values.responsiblePersonId}
                                        onValueChange={formikProps.handleChange('responsiblePersonId')}
                                    >
                                        {responsiblePersonOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value}/>
                                        ))}
                                    </Picker>

                                    <Text style={{marginBottom: 10}}/>

                                    <Button
                                        title={'Обновить'}
                                        onPress={() => formikProps.handleSubmit()}
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
                    </SafeAreaView>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default ReportsUpdateForm;
