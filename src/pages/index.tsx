import Head from 'next/head'
import Link from 'next/link'
import Alarms from '../components/alarmComponent'
import Card from '../components/card'
import EventCard from '../components/eventCard'
import NewsComponent from '../components/newsComponent'

export default function Home() {
  return (<>
    <div className="row">
      <div className="col-sm-8">
        <h1>Herzlich Willkommen</h1>
        <h2>auf der Homepage der freiwilligen Feuerwehr Rennertehausen</h2>
        <p>Diese Homepage befindet sich momentan noch im Aufbau. Daher kann es vorkommen, dass einige Links nicht wie gewohnt funktionieren.</p>
        <div className="mt-3">
          <h3>Letzter Einsatz</h3>
          <Alarms id="latest" />
        </div>
      </div>
      <div className="col-sm-4">
        <EventCard className="m-2" title="Nächste Termine" />
        <Card className="m-2">
          <h5 className="card-title">Kontakt</h5>
          <p className="card-text">Vorstand: <Link href="mailto://vorstand@feuerwehr-rennertehausen.de">
            <a className="text-primary text-decoration-none">vorstand@feuerwehr-rennertehausen.de</a>
          </Link></p>
        </Card>
        <Card className="m-2">
          <h5 className="card-title">Links</h5>
          <div className="d-flex flex-column">
            <h6 className="card-subtitle my-2">Örtliche Vereine</h6>
            <Link href="https://www.sv-rennertehausen.de/">
              <a className="me-2 text-decoration-none" title="Sportverein Rennertehausen" target="_blank" rel="noreferrer">
                Sportverein Rennertehausen
              </a>
            </Link>
            <Link href="https://mgv-rennertehausen.de/">
              <a className="me-2 text-decoration-none" title="MGV-Rennertehausen" target="_blank" rel="noreferrer">
                MGV-Rennertehausen
              </a>
            </Link>
            <Link href="https://www.schuetzenverein1930ev.info/">
              <a className="me-2 text-decoration-none" title="Schützenverein Rennertehausen" target="_blank" rel="noreferrer">
                Schützenverein Rennertehausen
              </a>
            </Link>
            <h6 className="card-subtitle my-2">Feuerwehr</h6>
            <Link href="https://kfv.feuerwehr-waldeck-frankenberg.de/">
              <a className="me-2 text-decoration-none" title="Kreisfeuerwehrverband" target="_blank" rel="noreferrer">
                Kreisfeuerwehrverband
              </a>
            </Link>
            <Link href="https://www.feuerwehr-allendorf-eder.de/">
              <a className="me-2 text-decoration-none" title="Feuerwehr Allendorf" target="_blank" rel="noreferrer">
                Feuerwehr Allendorf
              </a>
            </Link>
            <Link href="https://www.ffw-battenberg.de/">
              <a className="me-2 text-decoration-none" title="Feuerwehr Battenberg" target="_blank" rel="noreferrer">
                Feuerwehr Battenberg
              </a>
            </Link>
            <h6 className="card-subtitle my-2">Social Media</h6>
            <div className="flex-row">
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
        </Card>
      </div>
    </div>
    <div className='row'>
      <NewsComponent />
    </div>
  </>
  )
}
