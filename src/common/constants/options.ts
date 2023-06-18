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
    NEW = 'NEW',
    TO_APPROVE = 'TO_APPROVE'
};

export enum EnumType {
    FUNCTIONALITY = 'FUNCTIONALITY',
    REPORTING = 'REPORTING',
    OTHER = 'OTHER',
    VULNERABILITY = 'VULNERABILITY'
};

export enum EnumRole {
    DEV = 'DEV',
    GUEST = 'GUEST',
    QA = 'QA'
}

export const roleOptions = [
    {label: 'Исполнитель', value: EnumRole.DEV},
    {label: 'Проверяющий', value: EnumRole.QA},
    {label: 'Гость', value: EnumRole.GUEST}
]

export const priorityOptions = [
    {label: 'Критический', value: EnumPriority.CRITICAL},
    {label: 'Высокий', value: EnumPriority.HIGH},
    {label: 'Низкий', value: EnumPriority.LOW},
    {label: 'Обычный', value: EnumPriority.NORMAL},
];

export const statusOptions = [
    {label: 'Закрыт', value: EnumStatus.CLOSED},
    {label: 'Обсуждение', value: EnumStatus.DISCUSSION},
    {label: 'В работе', value: EnumStatus.FULFILMENT},
    {label: 'Новый', value: EnumStatus.NEW},
    {label: 'На утверждении', value: EnumStatus.TO_APPROVE},
];

export const typeOptions = [
    {label: 'Реализация', value: EnumType.FUNCTIONALITY},
    {label: 'Отчет', value: EnumType.REPORTING},
    {label: 'Другое', value: EnumType.OTHER},
    {label: 'Ошибка', value: EnumType.VULNERABILITY},
];

export const labelsRole = roleOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

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

export const roleOptionsList = [
    { label: labelsRole[EnumRole.QA], value: EnumRole.QA },
    { label: labelsRole[EnumRole.DEV], value: EnumRole.DEV },
    { label: labelsRole[EnumRole.GUEST], value: EnumRole.GUEST },
];

export const priorityOptionsList = [
    { label: labelsPriority[EnumPriority.CRITICAL], value: EnumPriority.CRITICAL },
    { label: labelsPriority[EnumPriority.HIGH], value: EnumPriority.HIGH },
    { label: labelsPriority[EnumPriority.LOW], value: EnumPriority.LOW },
    { label: labelsPriority[EnumPriority.NORMAL], value: EnumPriority.NORMAL },
];

export const statusOptionsList = [
    { label: labelsStatus[EnumStatus.CLOSED], value: EnumStatus.CLOSED },
    { label: labelsStatus[EnumStatus.DISCUSSION], value: EnumStatus.DISCUSSION },
    { label: labelsStatus[EnumStatus.FULFILMENT], value: EnumStatus.FULFILMENT },
    { label: labelsStatus[EnumStatus.NEW], value: EnumStatus.NEW },
    { label: labelsStatus[EnumStatus.TO_APPROVE], value: EnumStatus.TO_APPROVE },
];

export const typeOptionsList = [
    { label: labelsType[EnumType.FUNCTIONALITY], value: EnumType.FUNCTIONALITY },
    { label: labelsType[EnumType.REPORTING], value: EnumType.REPORTING },
    { label: labelsType[EnumType.OTHER], value: EnumType.OTHER },
    { label: labelsType[EnumType.VULNERABILITY], value: EnumType.VULNERABILITY },
];
