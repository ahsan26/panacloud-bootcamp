import React from "react";

export default ({ txt, id, deleteTodo }) => (
    <li key={id}>{txt} <button onClick={() => deleteTodo(id)}>&times;</button></li>
);