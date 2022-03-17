import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <div className="container-fluid">
            <Navbar />
            <main className="container pt-3">
                {children}
            </main>
            <Footer />
        </div>
    )
}
