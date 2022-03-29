import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/card'
import EventCard from '../components/eventCard'
import Layout from '../components/layout'

import banner from '../../public/banner.jpg'

export default function Home() {
  return (<div className="mt-n3">
    <div className="row">
      <img src="/banner.jpg" alt="banner" className="img-fluid img-banner" />
    </div>
    <div className="row">
      <div className="col-sm-8">
        <h1>Herzlich Willkommen</h1>
        <h2>auf der Homepage der freiwilligen Feuerwehr Rennertehausen</h2>
        <p>Diese Homepage befindet sich momentan noch im Aufbau. Daher kann es vorkommen, dass einige Links nicht wie gewohnt funktionieren</p>
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
          <h5 className="card-title">Social Media</h5>
          <div className="d-flex">
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
        </Card>
      </div>
    </div>
  </div>
  )
}
