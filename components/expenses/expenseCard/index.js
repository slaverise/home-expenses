import PropTypes from 'prop-types'

import Date from '../../date/index.js'

import styles from './index.module.scss'

export default function ExpenseCard({name, ammount, period}) {
  return (
    <>
      <h2>Resumen del gasto</h2>
      <table className={styles.table}>
        <tr>
          <td>Gasto</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Importe</td>
          <td>{ammount} €</td>
        </tr>
        <tr>
          <td>Fecha inicio</td>
          <td>
            <Date {...period.from} />
          </td>
        </tr>
        <tr>
          <td>Fecha fin</td>
          <td>
            <Date {...period.to} />
          </td>
        </tr>
      </table>
    </>
  )
}

ExpenseCard.propTypes = {
  name: PropTypes.string,
  ammount: PropTypes.number,
  period: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  })
}
