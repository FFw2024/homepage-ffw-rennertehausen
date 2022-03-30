import Head from 'next/head';

import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children, banner = false }) {
    return (
        <>
            <Head>
                <title>Feuerwehr Rennertehausen</title>
                {/* <meta name="description" content="" /> */}
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar banner={banner} />
            <main className="container py-3">
                {children}
            </main>
            <Footer />
        </>
    )
}
