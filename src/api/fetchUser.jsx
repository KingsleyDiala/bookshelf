import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "../queries";
import { useAllContext } from "../component/context/context";

const FetchUser = ({children}) => {
  const { setUsers } = useAllContext();

  const { error, loading, data } = useQuery(USERS_QUERY);



  useEffect(() => {
    data && setUsers(data.authorizedUsers);
    if (error) console.log(error.networkError.result.errors[0].message);
  }, [loading]);

  return <>{children}</>;
};

export default FetchUser;
