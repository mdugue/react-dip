import React from 'react'
import Dip from 'react-dip'
import contacts from '../data'

const contactsById = contacts.reduce((map, contact) => {
  map[contact.id] = contact
  return map
}, {})

const Profile = props => (
  <Dip dipId={props.url.query.id}>
    About {contactsById[props.url.query.id].firstName}
  </Dip>
)

export default Profile
