import React from "react";

export default ({
isDisabled
})=>(
    <div>
    <form className="input-group">
        <input type="text" className="form-control" placeholder="Write your message..." />
        <div className="input-group-append">
            <button className="btn submit-button" disabled={isDisabled()}>
                SEND
      </button>
        </div>
    </form>
</div>
);