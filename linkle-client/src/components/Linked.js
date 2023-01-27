import React, { useEffect, useState } from "react"
import Background from "./Background"
import {useSearchParams} from 'react-router-dom';
import SpotifyUtils from '../proxies/SpotifyUtils'

function Linked () {
    const [queryParameters] = useSearchParams();
    const link = queryParameters.get("link");

    const [token, setToken] = useState("")

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/getToken');
            const body = await response.json();
            console.log(response, body);
        }
        fetchData();
    }, [])
    
    return (
        <div className="App">
            <Background />
            <div className="context">{link}</div>
        </div>
    )
}

export default Linked