import React from "react";

import Spinner from "../layout/Spinner";

const Restaurant = ({ restaurants, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return <div id='output'>{restaurants}</div>;
  }
};

export default Restaurant;
