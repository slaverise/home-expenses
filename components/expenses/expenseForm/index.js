import {useEffect, useReducer} from 'react'

import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'

import DateInput from '../../dateInput/index.js'
import Input from '../../input/index.js'

import styles from './index.module.scss'

const emptyDate = () => ({
  day: '',
  month: '',
  year: ''
})

const emptyExpense = () => ({
  id: uuid(),
  name: '',
  ammount: 0,
  paid: false,
  period: {
    from: emptyDate(),
    to: emptyDate()
  }
})

function ExpenseForm({onAccept, onCancel, isVisible, expense}) {
  const reducer = (state, action) => {
    return {...state, ...action}
  }

  const [state, dispatch] = useReducer(reducer, expense ?? emptyExpense())

  useEffect(() => {
    dispatch(expense)
  }, [expense, isVisible])

  const onClick = () => {
    // TODO: Validar datos

    const expense = {
      ...state
    }

    onAccept(expense)
  }
  const curryDispatch = key => value => {
    dispatch({[key]: value})
  }

  const curryDispatchPeriod = key => value => {
    const period = {...state.period, [key]: value}
    dispatch({period})
  }

  return (
    <Dialog open={isVisible}>
      <DialogTitle>Añadir gasto</DialogTitle>
      <DialogContent className={styles.content}>
        <Box className={styles.box}>
          <Input label="Nombre:" onChange={curryDispatch('name')} value={state.name} />
        </Box>
        <Box className={styles.box}>
          <Input label="Cantidad:" onChange={curryDispatch('ammount')} value={state.ammount} />
        </Box>
        <Box className={styles.box}>
          <DateInput label="Desde:" onChange={curryDispatchPeriod('from')} value={state.period.from} />
        </Box>
        <Box className={styles.box}>
          <DateInput label="Hasta:" onChange={curryDispatchPeriod('to')} value={state.period.to} />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={value => {
                curryDispatch('paid')(value.target.checked)
              }}
              checked={state.paid}
            />
          }
          label="Pagado"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button variant="contained" onClick={onClick}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ExpenseForm.propTypes = {
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  isVisible: PropTypes.bool,
  expense: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    ammount: PropTypes.number,
    paid: PropTypes.bool,
    period: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string
    })
  })
}

export default ExpenseForm
