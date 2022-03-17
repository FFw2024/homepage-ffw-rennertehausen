import Head from 'next/head';

import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Feuerwehr Rennertehausen</title>
                {/* <meta name="description" content="" /> */}
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar />
            <main className="container pt-3">
                {children}
            </main>
            <Footer />
        </>
    )
}
