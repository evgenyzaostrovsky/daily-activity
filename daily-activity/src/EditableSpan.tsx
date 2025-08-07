import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Box from "@mui/material/Box";

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
            sx={{ width: "100px", margin: '0' }}
            variant="standard"
            size="small"
            value={localValue}
            onChange={handleChange}
            autoFocus
            onBlur={offEditMode}
            slotProps={{
                input: {
                    disableUnderline: true
                }
            }}

        />
    ) : (
        <Box sx={{
            display: "inline-flex"
        }}>
        <span className={classes} onDoubleClick={onEditMode}>
            {value}
        </span>
            <BorderColorIcon
                fontSize={'small'}
                sx={
                    {
                        padding: "5px 0px 0px 0px",
                        cursor: "pointer"
                    }}
                onClick={onEditMode}/>
        </Box>

    );
};
