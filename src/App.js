import React, { useState } from 'react';
import { ethers } from "ethers";
import { useEffect } from 'react';
import smsOracleAbi from './contracts/SMSOracle.json'

function SMSForm() {
  const { library } = ethers();
  const [contractAddress, setContractAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);

  const contractAddress = '0x006202d2E96abeb270beAba53aBeE242f3353Af9';
  const contractABI = abi.abi;

  
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0];
        setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  let contract;
  useEffect(() => {
    contract = new library.Contract(smsOracleAbi, contractAddress);
  },[contractAddress])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending SMS...")
    contract.functions.requestSMS(phoneNumber, message).send().then((tx) => {
      setStatus("SMS sent!")
    }).catch((err) => {
      setStatus("Error while sending SMS")
    });
  }

  contract.on("SendSMS", (phoneNumber, message) => {
    setStatus(`SMS sent to ${phoneNumber}`)
  })

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contract Address:
        <input type="text" value={contractAddress} onChange={(event) => setContractAddress(event.target.value)} />
      </label>
      <br />
      <label>
        Phone number:
        <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      </label>
      <br />
      <label>
        Message:
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <br />
      <button type="submit">Send SMS</button>
      <br />
      {status}
    </form>
  );
}
export default SMSForm;
