import React from 'react'
import Link from 'next/link'
import Dip from 'react-dip'
import contacts from '../data'

const List = () => (
  <section>
    <h1>Contacts</h1>
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Link href={{pathname: `/profile`, query: {id: contact.id}}}>
            <Dip component="a" dipId={contact.id.toString()}>
              {contact.firstName}
            </Dip>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default List
