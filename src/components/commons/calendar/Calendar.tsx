import { DatepickerConfigs, SingleDatepicker } from 'chakra-dayzed-datepicker';

const formatDataConfig: DatepickerConfigs = {
    dateFormat: 'dd/MM/yyyy',
    dayNames: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'], // length of 7
    monthNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'], // length of 12
}

const propsConfig = {
    dateNavBtnProps: {
        colorScheme: "blue",
        variant: "solid"
    },
    dayOfMonthBtnProps: {
        defaultBtnProps: {
            borderColor: "blue",
            _hover: {
                background: 'blue.400',
            }
        },
        selectedBtnProps: {
            background: "blue",
            // color: "green",
        },
        todayBtnProps: {
            background: "green",
        }
    },
    inputProps: {
        size: "sm"
    },
    popoverCompProps: {
        popoverContentProps: {
            background: "gray.700",
            color: "white",
        },
    },
}

type CalendarProps = {
    executedAt: Date
    setExecutedAt: (value: Date) => void,
    isDisabled?: boolean
}


export function Calendar({ executedAt, setExecutedAt, isDisabled }: CalendarProps) {
    return <SingleDatepicker
        configs={formatDataConfig}
        propsConfigs={propsConfig}
        disabled={isDisabled}
        name="date-input"
        date={executedAt}
        onDateChange={(date) => { setExecutedAt(date)}}
    />
}