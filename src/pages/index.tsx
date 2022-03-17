import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import EventCard from '../components/eventCard'
import Layout from '../components/layout'

export default function Home() {
  return (<>
    <div className="row">
      <div className="col-sm-8">
        <h1>Herzlich Willkommen</h1>
        <h2>auf der Homepage der freiwilligen Feuerwehr Rennertehausen</h2>
        <p>Diese Homepage befindet sich momentan noch im Aufbau. Daher kann es vorkommen, dass einige Links nicht wie gewohnt funktionieren</p>
      </div>
      <div className="col-sm-4">
        <EventCard className="m-2" title="Nächste Termine" />
        <Card className="m-2" title='Kontakt' items={[
          <>Vorstand: <Link href="mailto://vorstand@feuerwehr-rennertehausen.de">
            <a className="text-primary text-decoration-none">vorstand@feuerwehr-rennertehausen.de</a>
          </Link></>
        ]} />
        <Card className="m-2" title='Social Media' items={[

        ]} />
      </div>
    </div>
  </>
  )
}
