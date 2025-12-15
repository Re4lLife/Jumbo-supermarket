import { useEffect, useRef } from "react";

export default function useClickOut(handler) {
    const el = useRef()

    //This is to listen for a click outside of the modal to close the modal also.
    useEffect(function () {

        function handleClick(e) {
            if (el.current && !el.current.contains(e.target)) handler();
        }

        //The 'true' there is because when we click the button to ope the window, it immediately detects a click outside and it would seem like the button is not opening at all. The 'true' solves that.
        document.addEventListener('click', handleClick, true);

        return () => document.removeEventListener('click', handleClick, true);
    }, [handler]);

    return el;
}