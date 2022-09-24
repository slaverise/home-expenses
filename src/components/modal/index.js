import PropTypes from 'prop-types'

import './index.scss'

function Modal({isVisible, ...props}) {
  console.log('isVisible', isVisible)
  return (
    isVisible && (
      <>
        <div className="Modal"></div>
        <div className="Modal-modal" {...props} />
      </>
    )
  )
}

Modal.propTypes = {
  isVisible: PropTypes.string
}

export default Modal
