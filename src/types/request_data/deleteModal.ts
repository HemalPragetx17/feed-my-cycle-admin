export type CommonDeleteModalProps = {
    show: boolean;
    onHide: () => void;
    title?: string;
    headerText?: string;
    btnText?: string;
    fontWeight?: string;
    id?: { _id: string } | string | null;
    handleSubmit: (id: string) => Promise<void> | void;
};
