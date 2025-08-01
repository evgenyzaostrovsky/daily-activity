import { useRef, useEffect, useState } from 'react';
import CountUp from 'react-countup';


interface CountUpWithMemoryProps {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}

export const CountUpWithMemory = ({
                                      value,
                                      duration = 1.2,
                                      decimals = 0,
                                      prefix = '',
                                      suffix = '',
                                  }: CountUpWithMemoryProps) => {
    const previousValueRef = useRef<number>(value);
    const [startValue, setStartValue] = useState<number>(value);

    useEffect(() => {
        setStartValue(previousValueRef.current);  // запоминаем, откуда стартовать
        previousValueRef.current = value;         // сохраняем текущее значение
    }, [value]);

    return (
        <CountUp
            start={startValue}
            end={value}
            duration={duration}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
        />
    );
};
