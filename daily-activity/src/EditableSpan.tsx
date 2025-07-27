import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    value: number;
    onChange: (newValue: number) => void;
    classes?: string;
};

export const EditableSpan = ({ value, onChange, classes }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const onEditMode = () => {
        setLocalValue(value); // при входе в режим редактирования обновляем локальное значение
        setEditMode(true);
    };

    const offEditMode = () => {
        setEditMode(false);
        onChange(localValue); // при выходе сохраняем значение
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        if (!isNaN(newValue)) {
            setLocalValue(newValue);
        }
    };

    return editMode ? (
        <TextField
            sx={{ width: "120px" }}
            variant="standard"
            size="small"
            value={localValue}
            onChange={handleChange}
            autoFocus
            onBlur={offEditMode}
        />
    ) : (
        <span className={classes} onDoubleClick={onEditMode}>
            {value}
        </span>
    );
};
