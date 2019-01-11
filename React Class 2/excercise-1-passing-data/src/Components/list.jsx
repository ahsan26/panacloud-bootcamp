import React from "react";

export default ({ data }) => (
    <ul>
        {data.map(
            item =>
                <li key={item.key}>{item.txt}</li>
        )}
    </ul>
);