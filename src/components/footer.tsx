import Link from "next/link";
import { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer className="fixed-bottom bg-dark container-flex">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-md-auto me-2">
                            <span className="text-muted">&copy; 2022 - Feuerwehr Rennertehausen</span>
                        </div>
                        <div className="col-md-auto me-2">
                            <Link href="/impressum">
                                <a className="text-primary text-decoration-none">Impressum</a>
                            </Link>
                        </div>
                        <div className="col-md-auto ms-auto">
                            <a className="me-2" href="https://www.instagram.com/feuerwehr_rth/" title="Instagram" target="_blank" rel="noreferrer">
                                <i className="text-primary bi bi-instagram"/>
                            </a>
                            <a href="https://www.facebook.com/feuerwehr.rennertehausen" title="Facebook" target="_blank" rel="noreferrer">
                                <i className="text-primary bi bi-facebook" />
                            </a>
                        </div>
                    </div>
                </div>

            </footer>
        )
    }
}
