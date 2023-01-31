import React, { useEffect, useState } from "react"
import Background from "./Background"
import {useSearchParams} from 'react-router-dom';
import SpotifyUtils from '../util/SpotifyUtils'

function Linked () {
    const [queryParameters] = useSearchParams();
    const link = queryParameters.get("link");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/getToken');
            const token = (await response.json()).access_token;
            const track = SpotifyUtils.getSpotifyInfoFromUrl(token, link)
            const track2 = await SpotifyUtils.getSpotifyInfoFromUrl(token, link)
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