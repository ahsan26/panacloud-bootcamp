import React from "react";

export default ({ addNewItem, value, handleChange, inputIsEmpty }) => (
    <form onSubmit={addNewItem}>
        <input
            type="text"
            placeholder="Enter New Item"
            value={value}
            onChange={handleChange}
        />
        <button disabled={inputIsEmpty()}>Add</button>
    </form>
);