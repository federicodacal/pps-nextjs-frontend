'use client';

import { useState } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.sessionStorage.getItem(key);
            
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from sessionStorage', error);

            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);

            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error('Error writing to sessionStorage', error);
        }
    };

    return [storedValue, setValue] as const;
}