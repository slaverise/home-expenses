import {useState} from 'react'

import PropTypes from 'prop-types'

import Guest from '../../components/guest/index.js'
import AddGuest from '../addGuest/index.js'
import Button from '../button/index.js'
import useModal from './useModal.js'

function Guests({onChange}) {
  const [guests, setGuests] = useState([])
  const {isVisible, open, close} = useModal()

  const onAccept = guest => {
    const current = [...guests, guest]
    setGuests(current)
    onChange(current)
    close()
  }

  return (
    <div>
      {guests.map(guest => (
        <Guest {...guest} key={guest.name} />
      ))}
      <Button onClick={open}>Añadir huésped</Button>
      <AddGuest isVisible={isVisible} onAccept={onAccept} onCancel={close} />
    </div>
  )
}

Guests.propTypes = {
  onChange: PropTypes.func
}
export default Guests
