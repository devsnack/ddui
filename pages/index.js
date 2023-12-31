import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "@/components/login";
import useAuth from "@/hooks/useAuth";
import PersistLogin from "@/components/keepon";
import Dash from "@/components/home";
import withAuth from "@/components/keepon/withauth";
const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dash></Dash>
    </>
  );
}
export default withAuth(Home);
