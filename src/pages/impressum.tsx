import Link from "next/link";

export default function Impressum() {
    return (
        <>
            <h1>Impressum</h1>
            <p>Angaben gem&#228;&#223; &#167;5 TMG:<br />
                Freiwillige Feuerwehr Rennertehausen e.V.
            </p>
            <p>
                1. Vorsitzender <br />
                Mike Stahl<br />
                Hinter den G&#228;rten 10<br />
                35108 Rennertehausen
            </p>
            <p>
                2. Vorsitzender<br />
                Philipp Geil
            </p>
            <p>
                Registergericht: Amtsgericht Marburg<br />
                Registernummer: VR 3746
            </p>
            <p>
                V.i.S.D &#167; 55 Abs. 2 RStV:<br />
                Mike Stahl
            </p>
            <h3>Kontakt</h3>
            <span>
                EMail: <Link href="mailto://vorstand@feuerwehr-rennertehausen.de">
                    <a className="text-primary text-decoration-none">vorstand@feuerwehr-rennertehausen.de</a>
                </Link>
            </span>
        </>
    )
}