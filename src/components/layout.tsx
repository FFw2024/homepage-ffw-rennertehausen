import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container pt-3">
                {children}
            </main>
            <Footer />
        </>
    )
}
