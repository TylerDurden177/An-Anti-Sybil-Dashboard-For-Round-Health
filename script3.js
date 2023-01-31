import React, { useState, useEffect } from "react";
import ipfs from "ipfs-http-client";
import axios from "axios";

const ipfsClient = ipfs("ipfs.infura.io", "5001", { protocol: "https" });

const retrieveBlockchainData = async (query) => {
  const response = await axios.get(`https://api.blockchair.com/ethereum/${query}`);
  return response.data;
};

const retrieveIPAddressData = async (query) => {
  const response = await axios.get(`https://api.nominum.com/v1/IP/${query}`);
  return response.data;
};

const AntiSybilDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data from IPFS
    ipfsClient.files.cat("/ipfs/QmHash").then((data) => setData(data));
  }, []);

  const blockchainData = retrieveBlockchainData("transactions");
  const ipAddressData = retrieveIPAddressData("query");

  return (
    <div className="dashboard">
      <div className="blockchain-data">
        <h2>Blockchain Data</h2>
        <p>{blockchainData}</p>
      </div>
      <div className="ip-address-data">
        <h2>IP Address Data</h2>
        <p>{ipAddressData}</p>
      </div>
    </div>
  );
};

export default AntiSybilDashboard;
