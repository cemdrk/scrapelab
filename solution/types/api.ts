// types/api.ts

interface CustomHeader {
    key: string,
    value: string,
}

interface Header {
    [key: string]: string
}

export type {CustomHeader, Header}
