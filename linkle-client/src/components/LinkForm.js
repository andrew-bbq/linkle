import React from "react"
import {useNavigate} from 'react-router-dom';

function LinkForm () {
    const navigate = useNavigate();

    let getLinks = async (e) => {
        navigate(`linkypoo?link=${encodeURIComponent(e.target.elements.link.value)}`, {replace: true})
    }

    return (
        <form onSubmit={getLinks}>
            <input name="link" className="input--text" type="text" placeholder="Link" />
            <input value="Link me" className="input--submit" type="submit" />
        </form>
    )
}

export default LinkForm