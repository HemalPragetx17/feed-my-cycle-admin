export interface IDefaultOptionsData {
    _id?: string;
    option: string;
    _createdAt?: string;
}

export interface DefaultOptionsValidateData {
    option: boolean;
}

export interface IMotivationalQuotesData {
    _id?: string;
    quote?: string;
    file?: File | string;
    _createdAt?: string;
}

export interface MotivationalQuotesValidateData {
    quote: boolean;
    file?: boolean;
}