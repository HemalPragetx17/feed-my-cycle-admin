import moment from 'moment';
const Method = {
    convertDateToDDMMYYYY: (date: string) => {
        return moment(date).local().format("DD/MM/YYYY ");
    },
    getTodayDate: (format: string) => {
        return moment(new Date()).local().format(format);
    },
    convertDateToFormat: (date: any, format: string) => {
        return moment(date).local().format(format);
    },
    convertDateToDDMMYYYYHHMM: (date: string) => {
        return moment(date).local().format("DD/MM/YYYY hh:mm ");
    },
    convertDateToDDMMYYYYHHMMAMPM: (date: string) => {
        return moment(date).local().format("DD/MM/YYYY hh:mm A");
    },
    convertDateToDDMMYYYYHOURS: (date: string) => {
        return moment(date).local().format("DD/MM/YYYY [,] HH:mm ");
    },
    checkisSameOrAfter: (date1: string, date2: string) => {
        return moment(date2).isSameOrAfter(date1);
    },
    dayDifference: (date1: any, date2: any) => {
        return moment(date2).diff(date1, "days");
    },
    convertDateToDDMMYYYYHHMMAMPMWithSeperator: (date: string, seperator?: string) => {
        if (!seperator) return moment(date).local().format("DD/MM/YYYY hh:mm A");
        else {
            let format = "DD/MM/YYYY [" + seperator + "]  hh:mm A";
            return moment(date).local().format(format);
        }
    },
    getNameCharacter: (name: string) => {
        if (!name || name.length === 0) return "";
        name = name.toUpperCase();
        const [firstName, lastName] = name.split(" ");
        let chars = "";
        if (firstName) chars += firstName[0];
        if (lastName) chars += lastName[0];
        return chars;
    },
};
export default Method;
