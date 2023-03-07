//contexts
import { UserProvider } from "contexts/UserContext";
import { AlertProvider } from "contexts/AlertContext";
import { DarkModeProvider } from "contexts/DarkModeContext";

//Layout
import Layout from "layouts/Layout";

//components
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <NextNProgress color="#3f51b5" showOnShallow={false} height={4} />

      <UserProvider>
        <AlertProvider>
          <AppData Component={Component} pageProps={pageProps} />
        </AlertProvider>
      </UserProvider>
    </DarkModeProvider>
  );
}

function AppData({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
