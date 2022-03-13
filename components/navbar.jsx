import Link from "next"
import { Component } from "react";

class MenuItem {
    constructor(href, name, id = "", items = []) {
        this.href = href;
        this.name = name;
        this.id = id;
        this.items = items;

        this.items.forEach(item => item.parent = this);

        this.parent = null;
    }

    getHref(base) {
        return base + "/" + this.href;
    }
}

const menu = {
    brand: {
        href: "/",
        text: "Home"
    },
    menu: [
        new MenuItem("/about", "Wir über uns", [
            new MenuItem("/vorstand", "Vorstand")
        ]),
        new MenuItem("/jugendfeuerwehr", "Jugendfeuerwehr"),
        new MenuItem("/einsatzabteilung", "Einsatzabteilung", [
            new MenuItem("/uebungen", "Übungen"),
            new MenuItem("/fahrzeuge", "Fahrzeuge")
        ])
    ]
};

export default class Navbar extends Component {

    createMenu() {

    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link href={menu.brand.href}>
                        <a className="navbar-brand">{menu.brand.text}</a>
                    </Link>
                </div>
            </nav>
        );
    }
}
