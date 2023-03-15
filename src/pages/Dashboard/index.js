import React, { useState } from "react";
import Home from "./Home"
import Users from "./Users"
import Transactions from "./Transactions"
import Navbar from "../../components/Navbar";
import Community from "../Community";

const Dashboard = () => {
  const [page, setPage] = useState('Home')

  const handleActiveComponent = (req, curr) => {
    setPage(curr)
  }
  return (
    <>
      <Navbar setPage={setPage} />
      <br />
      {page === 'Home' && <Home />}
      {page === 'User' && <Users />}
      {page === 'Transaction' && <Transactions />}
      {page === 'Community' && <Community />}
    </>
  );
}

export default Dashboard