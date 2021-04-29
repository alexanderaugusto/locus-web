/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function cpf(cpf: string) {
  const regex = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/
  const str = cpf.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '$1.$2.$3-$4')
}

function phone(phone: string) {
  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/
  const str = phone.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '($1) $2-$3')
}

function formatCurrency(currency: number) {
  if (currency === undefined || currency === null) {
    return ''
  }

  const value = currency.toFixed(2).split('.')
  value[0] = 'R$ ' + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

export default {
  cpf,
  phone,
  formatCurrency
}
