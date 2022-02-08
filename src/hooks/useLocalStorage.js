import { useState, useEffect } from 'react'

export default function useLocalStorage(key, defaultValue) {
    console.log('calling local storage hook')
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue !== null) return JSON.parse(jsonValue)

        if (typeof defaultValue === 'function') {
            return defaultValue()
        } else return defaultValue
    })

    useEffect(() => {
        console.log('calling local storage effect')
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}
