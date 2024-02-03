import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAllContext } from "../component/context/context";
import { COMMENTS_QUERY } from "../queries";

const FetchComments = () => {
  const { setAllComments } = useAllContext();

  const { loading, error, data } = useQuery(COMMENTS_QUERY);

  useEffect(() => {
    data && setAllComments(data.comments);

    if (error) console.log(error.networkError.result.errors[0].message);
  }, [loading]);

  return <></>;
};

export default FetchComments;
