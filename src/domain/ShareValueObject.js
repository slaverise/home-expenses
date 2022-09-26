class ShareValueObject {
  constructor() {
    this._dictionary = {}
  }

  addAmmount({expense, guest, ammount}) {
    this.ensureExpense(expense)
    this.ensureGuest(expense, guest)

    console.log('guest ammount here', this._dictionary[expense][guest], ammount)
    this._dictionary[expense][guest] += ammount
  }

  ensureExpense(expense) {
    if (this._dictionary[expense]) {
      return
    }
    this._dictionary[expense] = {}
  }

  ensureGuest(expense, guest) {
    if (this._dictionary[expense][guest]) {
      return
    }

    this._dictionary[expense][guest] = 0
  }
}

export default ShareValueObject
