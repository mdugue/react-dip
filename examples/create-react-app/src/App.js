import 'web-animations-js'
import React from 'react'
import './App.css'
import Dip from 'react-dip'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import avatar from './Avatar.svg'

const contacts = [
  {
    id: '1',
    firstName: 'Fidel',
    lastName: 'Hubbucks',
    email: 'fhubbucks0@geocities.com',
    gender: 'Male',
  },
  {
    id: '2',
    firstName: 'Lucita',
    lastName: 'Gratland',
    email: 'lgratland1@marketwatch.com',
    gender: 'Female',
  },
  {
    id: '3',
    firstName: 'Reine',
    lastName: 'Nekrews',
    email: 'rnekrews2@alexa.com',
    gender: 'Female',
  },
  {
    id: '4',
    firstName: 'Honor',
    lastName: 'Faudrie',
    email: 'hfaudrie3@cloudflare.com',
    gender: 'Female',
  },
  {
    id: '5',
    firstName: 'Wilt',
    lastName: 'Bedburrow',
    email: 'wbedburrow4@sakura.ne.jp',
    gender: 'Male',
  },
  {
    id: '6',
    firstName: 'Archambault',
    lastName: 'Surgenor',
    email: 'asurgenor5@yale.edu',
    gender: 'Male',
  },
  {
    id: '7',
    firstName: 'Ophelia',
    lastName: 'Coghlin',
    email: 'ocoghlin6@home.pl',
    gender: 'Female',
  },
  {
    id: '8',
    firstName: 'Angy',
    lastName: 'Sim',
    email: 'asim7@ihg.com',
    gender: 'Female',
  },
  {
    id: '9',
    firstName: 'Caryl',
    lastName: 'Ripping',
    email: 'cripping8@yahoo.co.jp',
    gender: 'Male',
  },
  {
    id: '10',
    firstName: 'Deborah',
    lastName: 'Hackelton',
    email: 'dhackelton9@sciencedaily.com',
    gender: 'Female',
  },
]

const contactsById = contacts.reduce((map, contact) => {
  map[contact.id] = contact
  return map
}, {})

const List = () => (
  <section>
    <h1>Contacts</h1>
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Link to={`/profile/${contact.id}`}>
            <Dip dipId={contact.id.toString()}>{contact.firstName}</Dip>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

const Profile = ({match}) => {
  const contact = contactsById[match.params.id]
  return (
    <section>
      <img src={avatar} />
      <Dip component="h1" dipId={match.params.id}>
        {contact.firstName} {contact.lastName}
      </Dip>
    </section>
  )
}

const Nav = () => (
  <nav>
    <Link to={'/'}>List</Link>
    <Link to={'/about'}>About</Link>
  </nav>
)

const About = () => (
  <section>
    <h1>react-dip</h1>
    <p>thanks for using ...</p>
    <h2>contact</h2>
  </section>
)

const App = () => (
  <Router>
    <div className="App">
      <Nav />
      <Route path="/" exact component={List} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)

export default App
