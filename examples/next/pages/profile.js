import React from "react"
import { contacts } from "../data"
import Dip from "react-dip"

const contactsById = contacts.reduce((map, contact) => {
  map[contact.id] = contact
  return map
}, {})

export default props => (
  <Dip id={props.url.query.id}>
    About {contactsById[props.url.query.id].firstName}
  </Dip>
)
