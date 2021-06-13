import { useRouter } from "next/router";
import React, { useEffect } from "react";

/*
 *
 */
const AragostaPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/r/ristorante-laragosta");
  });

  return <div></div>;
};

export default AragostaPage;
