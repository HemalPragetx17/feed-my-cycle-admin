export interface IFAQData {
    _id?: string;
    question: string;
    answer: string;
    _createdAt?: string;
};

export interface FAQValidateData {
    question: boolean;
    answer: boolean;
};