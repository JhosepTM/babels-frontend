import { Label } from "@/components/ui/label"
export interface PersonalDataDialogProps {
    label: string,
    value: string
}
export const PersonalDataDialog = ({label, value}: PersonalDataDialogProps) => {
    return <div className="flex flex-col">
        <Label className="text-black">{label}</Label>
        <div className="flex mt-2">
            <div className="p-4"></div>
            <Label className="text-black">{value}</Label>
        </div>
    </div>
}