export interface TextInputProps {
    label: string;
    name: string;
    placeholder: string;
    type: "number" | "search" | "time" | "text" | "hidden" | "tel" | "url" | "email" | "date" | "password" | "datetime-local" | "month" | "week" | undefined;
}