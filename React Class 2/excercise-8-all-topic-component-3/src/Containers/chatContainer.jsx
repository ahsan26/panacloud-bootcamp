import React from "react";
import ChatWindow from "../Components/chatWindow";

export default ({ isDisabled, users, messages }) => (
    <div className="shell">
        <ChatWindow
            users={users}
            isDisabled={isDisabled}
            messages={messages}
            userOfTheChatWindow={1}
        />
        <ChatWindow
            users={users}
            isDisabled={isDisabled}
            messages={messages}
            userOfTheChatWindow={0}
        />
    </div>
);