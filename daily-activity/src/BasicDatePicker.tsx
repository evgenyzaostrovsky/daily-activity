import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store'
import { setSelectedDate } from './features/date/dateSlice'


export default function BasicDatePicker() {

    const dispatch = useDispatch();
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>

                <DatePicker
                    value={selectedDate}

                    format="DD.MM.YYYY"
                    onChange={(date) => {
                        if (date) {
                            dispatch(setSelectedDate(date));
                        }
                    }}
                    slotProps={{
                        textField: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {
                                minWidth: 'unset !important',
                                '& .MuiPickersInputBase-sectionContent': {
                                    textAlign: 'center',
                                    fontSize: '14px',
                                },
                                '& .MuiPickersInputBase-root': {
                                    width: '140px',
                                    border: 'none'
                                },
                            },
                        },
                    }}
                />

            </DemoContainer>
        </LocalizationProvider>

    );}