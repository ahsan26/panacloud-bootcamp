import React from "react";

export default ({ txt, newTodo, handleChange }) => (
    <form onSubmit={newTodo}>
        <input
            type="text"
            value={txt}
            name="txt"
            onChange={handleChange}
            autoFocus
        />
        <button type="submit">+</button>
    </form>
);