import Link from "next/link";
import { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer className="fixed-bottom bg-dark container-fluid">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-sm-auto col-12 me-sm-2 text-center">
                            <span className="text-muted">&copy; 2022 - Feuerwehr Rennertehausen</span>
                        </div>
                        <div className="col-sm-auto col-6 me-sm-2 text-center text-sm-start">
                            <Link href="/impressum">
                                <a className="text-primary text-decoration-none">Impressum</a>
                            </Link>
                        </div>
                        <div className="col-sm col-6">
                            <div className="d-flex justify-content-end">
                                <Link href="https://www.instagram.com/feuerwehr_rth/">
                                    <a className="me-2" title="Instagram" target="_blank" rel="noreferrer">
                                        <i className="text-primary bi bi-instagram" />
                                    </a>
                                </Link>
                                <Link href="https://www.facebook.com/feuerwehr.rennertehausen">
                                    <a title="Facebook" target="_blank" rel="noreferrer">
                                        <i className="text-primary bi bi-facebook" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="w-100 d-none d-md-block"></div>
                        <div className="col-12 text-center">
                            <span className="text-white-50">Fehler und Verbesserungsvorschl&#228;ge k&#246;nnen gerne <Link href="https://github.com/PhiGei2000/homepage-ffw-rennertehausen/issues">
                                <a className="text-primary text-decoration-none">
                                    hier
                                </a>
                            </Link> gemeldet werden</span>
                        </div>
                    </div>
                </div>

            </footer>
        )
    }
}
