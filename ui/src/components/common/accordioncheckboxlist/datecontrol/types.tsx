export interface DateControlProps {
    value: string;
    onFromDateChange: (value: string, date: string) => void;
    fromDate: string;
    getTodayDate: () => string;
}
