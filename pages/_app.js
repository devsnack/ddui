import { AuthProvider } from "@/context/AuthProvider";
import Head from "next/head";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primeicons/primeicons.css";
import Drawer from "@/components/drawer";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Drawer></Drawer>
        <Component {...pageProps} />
      </AuthProvider>
    </PrimeReactProvider>
  );
}
