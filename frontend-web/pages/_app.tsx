import '../styles/globals.css'
import React from "react";
import {Layout} from "../components/layout/layout.component";

function MyApp({Component, pageProps}) {
    return <Layout {...pageProps}><Component {...pageProps} /></Layout>
}

export default MyApp
