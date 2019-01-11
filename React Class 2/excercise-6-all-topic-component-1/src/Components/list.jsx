import React from "react";

export default ({ data }) => (
    <ol>
        {
            data.map((item, i) =>
                <li key={i}>{item}</li>
            )
        }
    </ol>
)