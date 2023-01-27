import React from "react"
import LinkForm from "./LinkForm"

function Home () {
    return (
        <div className="context">
        <div>
          <label>Link:</label>
        </div>
        <div>
          <LinkForm />
        </div>
      </div>
    )
}

export default Home