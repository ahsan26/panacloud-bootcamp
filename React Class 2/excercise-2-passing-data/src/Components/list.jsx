import React from "react";

export default ({ data }) => (
    <ul>
        {data.map(
            item =>
                <li key={item.name}>{item.name}
                    {
                        item.likes && item.likes.length > 0 &&
                        <ul>
                            {
                                item.likes.map(like =>
                                    <li key={like}>{like}</li>
                                )
                            }
                        </ul>
                    }
                </li>
        )}
    </ul>
);