import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import {providers} from "ethers";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const[walletConnected, setWalletConnected] = useState(false);
  const web3Refs = useRef();

  const connectWallet = async()=>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.log(err);
    }
  };

  const getProviderOrSigner = async(needSigner = false)=>{
    const provider = await web3Refs.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();

    if(chainId!=80001){
      window.alert("Please Switch Network Mumbai TestNet");
      throw new Error("Please Switch Network To Mumbai TestNet");
    }
    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(()=>{
    if(!walletConnected){
      web3Refs.current = new Web3Modal({
        network: "Mumbai Testnet",
        providerOptions: {},
        disableInjectedProvider: false,
      }, [setWalletConnected]);
    }
  });

  return (
    <div>
    <div>
      <Header />
      <br />
      <h1 className="text-center text-white p-8 text-2xl"> ERNS - ETH RAVINTHIRAN NAME SERVICE </h1>
      <div className="grid ml-16 grid-cols-3 text-center font-bold p-16 gap-8 text-white">
        <div className="p-8 max-w-sm rounded-lg border border-gray-200 shadow-md bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button onClick={connectWallet} className="font-semibold"> CONNECT WALLET </button>
        </div>
        <div className="block p-8 max-w-sm rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button className="font-semibold" onClick={()=>router.push("https://ico-ravi-azd-token.vercel.app/")}> ICO </button>
        </div>
        <div className="block p-8 max-w-sm rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button className="font-semibold" onClick={()=>router.push("https://de-fi-ravi-token-eth.vercel.app/")}> DEFI </button>
        </div>
        <div className="block p-8 max-w-sm rounded-lg border hover:bg-blue-400 border-gray-200 shadow-md hover:bg-gray-100 bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button className="font-semibold" onClick={()=>router.push("https://minted-dao-ravi-ravinthiranpartheepan1407.vercel.app/")}> NFT MINT </button>
        </div>
        <div className="block p-8 max-w-sm rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button className="font-semibold" onClick={()=>router.push("https://minter-app-ravinthiranpartheepan1407.vercel.app/")}> DAO </button>
        </div>
        <div className="block p-8 max-w-sm rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 bg-gradient-to-l from-purple-200 via-purple-500 to-indigo-500 dark:border-gray-700">
          <button className="font-semibold" onClick={()=>router.push("https://dao-v1-ravi.vercel.app/")}> DEV DAO </button>
        </div>
      </div>
    </div>
    <br />
    <Footer/>
    </div>
  )
}
