
import React from "react";
import Auth from "../Auth/Auth";

export default function Login({ saveUserdata }) {
  return(
  <>
<div className="container m-auto w-90"></div>
    <Auth isLogin={true} saveUserdata={saveUserdata}/>;
  </>
  )
}
