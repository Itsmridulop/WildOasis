import { useEffect, useRef } from 'react'

export function useOutsideClick(handler) {
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler() 
        }

        document.addEventListener('click', handleClickOutside, true)

        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [handler])

    return { ref }
}