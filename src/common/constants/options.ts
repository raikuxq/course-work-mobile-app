export enum EnumPriority {
    CRITICAL = 'CRITICAL',
    HIGH = 'HIGH',
    LOW = 'LOW',
    NORMAL = 'NORMAL'
};

export enum EnumStatus {
    CLOSED = 'CLOSED',
    DISCUSSION = 'DISCUSSION',
    FULFILMENT = 'FULFILMENT',
    READY = 'READY',
    TO_APPROVE = 'TO_APPROVE'
};

export enum EnumType {
    FUNCTIONALITY = 'FUNCTIONALITY',
    REPORTING = 'REPORTING',
    UI = 'UI',
    VULNERABILITY = 'VULNERABILITY'
};

export const priorityOptions = [
    {label: 'Критический', value: EnumPriority.CRITICAL},
    {label: 'Высокий', value: EnumPriority.HIGH},
    {label: 'Низкий', value: EnumPriority.LOW},
    {label: 'Обычный', value: EnumPriority.NORMAL},
];

export const statusOptions = [
    {label: 'Закрыто', value: EnumStatus.CLOSED},
    {label: 'Обсуждение', value: EnumStatus.DISCUSSION},
    {label: 'Выполнение', value: EnumStatus.FULFILMENT},
    {label: 'Готово', value: EnumStatus.READY},
    {label: 'На утверждении', value: EnumStatus.TO_APPROVE},
];

export const typeOptions = [
    {label: 'Функциональность', value: EnumType.FUNCTIONALITY},
    {label: 'Отчетность', value: EnumType.REPORTING},
    {label: 'Интерфейс', value: EnumType.UI},
    {label: 'Уязвимость', value: EnumType.VULNERABILITY},
];

export const labelsPriority = priorityOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

export const labelsStatus = statusOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

export const labelsType = typeOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

export const priorityOptionsList = [  { label: labelsPriority[EnumPriority.CRITICAL], value: EnumPriority.CRITICAL },
    { label: labelsPriority[EnumPriority.HIGH], value: EnumPriority.HIGH },
    { label: labelsPriority[EnumPriority.LOW], value: EnumPriority.LOW },
    { label: labelsPriority[EnumPriority.NORMAL], value: EnumPriority.NORMAL },
];

export const statusOptionsList = [  { label: labelsStatus[EnumStatus.CLOSED], value: EnumStatus.CLOSED },
    { label: labelsStatus[EnumStatus.DISCUSSION], value: EnumStatus.DISCUSSION },
    { label: labelsStatus[EnumStatus.FULFILMENT], value: EnumStatus.FULFILMENT },
    { label: labelsStatus[EnumStatus.READY], value: EnumStatus.READY },
    { label: labelsStatus[EnumStatus.TO_APPROVE], value: EnumStatus.TO_APPROVE },
];

export const typeOptionsList = [  { label: labelsType[EnumType.FUNCTIONALITY], value: EnumType.FUNCTIONALITY },
    { label: labelsType[EnumType.REPORTING], value: EnumType.REPORTING },
    { label: labelsType[EnumType.UI], value: EnumType.UI },
    { label: labelsType[EnumType.VULNERABILITY], value: EnumType.VULNERABILITY },
];
