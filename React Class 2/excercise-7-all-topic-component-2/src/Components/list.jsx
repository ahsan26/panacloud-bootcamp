import React from "react";

export default ({ data, hideGamesPlayed }) => (
    <ul>
        {
            data.map((item, i) =>
                <li key={i}>{item.name} has played {hideGamesPlayed ? "*" : item.gamesPlayed} games</li>
            )
        }
    </ul>
)