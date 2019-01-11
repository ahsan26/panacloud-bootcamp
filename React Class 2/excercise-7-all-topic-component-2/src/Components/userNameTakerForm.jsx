import React from "react";

export default ({saveUserName,usrName,handleChange})=>(
    <form onSubmit={saveUserName}>
    <input
      type="text"
      value={usrName}
      name="usrName"
      placeholder={"Enter Your name"}
      onChange={handleChange}
    />
  </form>

);