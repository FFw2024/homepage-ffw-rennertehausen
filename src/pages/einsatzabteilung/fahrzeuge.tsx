/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import LF86 from '../../../public/img/BilderFahrzeuge/lf86/lf86_03.png'
import MTW from '../../../public/img/BilderFahrzeuge/mtw/mtw_01.png'

const data = [
    {
        index: "lf86",
        title: "LF 8/6",
        image: "/img/BilderFahrzeuge/lf86/lf86_03.png",
        technicalData: [
            { name: "Fahrgestell", value: "Mercedes Benz LK 814" },
            { name: "Aufbauhersteller", value: "Schlingmann" },
            { name: "Indienststellung", value: "1996" },
            { name: "Zugl. Gesamtmasse", value: "7495kg" },
            { name: "Motor", value: "R4 Turbodiesel" },
            { name: "Leistung", value: "103kW (140PS)" },
            { name: "Hubraum", value: "3.972 cm\u00B3" },
            { name: "Drehmoment", value: "500 Nm" },
            { name: "L\u00F6schwassertank", value: "600L" },
            { name: "Pumpe", value: "Rosenbauer 8/6" },
            { name: "F\u00F6rderleistung", value: "800L/ 5 bar" },
            { name: "Besondere Ausstattung", value: "Schiebleiter, TH R\u00FCstsatz, Mehrzweckzug MZ 32, Hochleisungsl\u00FCfter" }
        ]
    },
    {
        index: "mtw",
        title: "MTW",
        image: MTW.src,
        technicalData: [
            { name: "Fahrzeughersteller", value: "Volkswagen Nutzfahrzeuge" },
            { name: "Modell", value: "Transporter (T5, langer Radstand)" },
            { name: "Baujahr", value: "2006" },
            { name: "Zugl. Gesamtmasse", value: "3000kg" },
            { name: "Motor", value: "R5 Turbodiesel" },
            { name: "Leistung", value: "96kW (130 PS)" },
            { name: "Hubraum", value: "2.461 cm\u00B3" },
            { name: "Drehmoment", value: "340 Nm" },
            { name: "Ausbauhersteller", value: "Eigenbau" },
            { name: "Besondere Ausstattung", value: "Klimaanlage, Drehsitze, Einbautisch, Einbauschrank hinten, Standheizung" }
        ]
    }
];

export default function Fahrzeuge() {
    return (
        <>
            <h1>Fahrzeuge</h1>
            <p>Auf dieser Seite erhalten Sie Informationen &#252;ber unsere beiden Fahrzeuge.</p>

            <div className="container-md pb-4">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className="row mb-4">
                                <h3>{item.title}</h3>
                                <div className="row row-cols-1 row-cols-lg-2">
                                    <div className="col">
                                        <table className="table">
                                            <tbody>
                                                {
                                                    item.technicalData.map((dataItem, dataIndex) => {
                                                        return (
                                                            <tr key={dataIndex}>
                                                                <th scope='row'>{dataItem.name}</th>
                                                                <td>{dataItem.value}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col align-self-center">
                                        <img className="img-fluid" src={item.image} alt={item.title} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
