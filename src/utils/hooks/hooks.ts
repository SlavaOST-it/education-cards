import {AppDispatchType, RootState} from "../../bll/store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react'

export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
