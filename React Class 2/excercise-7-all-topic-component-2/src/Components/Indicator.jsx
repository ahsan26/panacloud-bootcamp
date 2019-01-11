import React from "react";

export default ({ txt,center }) => (
<h2 style={center&&{textAlign:'center'}}>
    {
        txt
    }
</h2>
);