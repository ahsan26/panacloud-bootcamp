import React from "react";

export default ({ users,ulAttrs,messages,userOfTheChatWindow }) => (
    <ul {...ulAttrs}>
        {messages.map((message, index) => (
            <li
                key={index}
                className={
                    message.username === users[userOfTheChatWindow].username ? 'message sender' : 'message recipient'
                }
            >
                <p>{`${message.username}: ${message.text}`}</p>
            </li>
        ))}
    </ul>
);