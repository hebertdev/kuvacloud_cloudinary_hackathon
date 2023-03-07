import { useState, useContext } from "react";

//contexts
import UserContext from "contexts/UserContext";

//components
import { HomeLogin } from "components/pages/HomeLogin";
import { HomeGuest } from "components/pages/Home";

export default function Home() {
  const { user } = useContext(UserContext);
  return <>{user ? <HomeLogin user={user} /> : <HomeGuest />}</>;
}
