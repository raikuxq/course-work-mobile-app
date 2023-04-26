export const dateFormat = (dateISO: string): string => {
    return new Date(dateISO).toLocaleDateString()
}

export const timeFormat = (dateISO: string): string => {
    return new Date(dateISO).toLocaleTimeString()
}

export const dateTimeFormat = (dateISO: string): string => {
    return new Date(dateISO).toLocaleString()
}

