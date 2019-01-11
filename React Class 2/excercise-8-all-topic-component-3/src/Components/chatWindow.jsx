import React from "react";
import ShowMessages from "./showMessages";
import SendMessageForm from "./sendMesageForm";

export default ({
    users,
    messages,
    isDisabled,
    userOfTheChatWindow
}) => (
        <div className="chat-window">
            <h2>GhupShap Chat App</h2>
            <div className="name sender">{users[userOfTheChatWindow].username}</div>
            <ShowMessages
                ulAttrs={{ className: 'message-list' }}
                messages={messages}
                users={users}
                userOfTheChatWindow={userOfTheChatWindow}
            />
            <SendMessageForm
                isDisabled={isDisabled}
            />
        </div>
    );