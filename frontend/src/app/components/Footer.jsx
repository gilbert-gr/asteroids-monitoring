import React from "react"

function Footer () {
    const year = new Date().getFullYear()

    return (
        <div>
            <footer>
                <p>Gilbert © {year}</p>
            </footer>
        </div>
    )
}

export default Footer