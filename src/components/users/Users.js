import React from "react";

import Spinner from "../layout/Spinner";

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return <div id='output' />;
  }
};

export default Users;
