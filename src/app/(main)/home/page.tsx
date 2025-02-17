import { auth } from "@/lib/auth";
import React from "react";
import HomeUi from "./home-component";

const HomePage = async () => {
  const user = await auth();
  return <HomeUi user={user} />;
};

export default HomePage;
