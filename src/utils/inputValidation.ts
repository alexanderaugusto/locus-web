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

function currency(value: string) {
  value = parseInt(value.replace(/[\D]+/g, '')).toString()
  value = value.replace(/([0-9]{2})$/g, ',$1')

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  if (value.length > 9) {
    value = value.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
  }

  if (value === 'NaN') {
    return ''
  }

  if (value.substr(0, 1) === ',' || value.substr(0, 1) === '.') {
    return value.substr(1)
  }

  return value
}

function formatCurrency(currency: number) {
  if (currency === undefined || currency === null) {
    return ''
  }

  const value = currency.toFixed(2).split('.')
  value[0] = 'R$ ' + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

const formatZipcode = text => {
  const regex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/
  const str = text.replace(/[^0-9]/g, '').slice(0, 8)

  return str.replace(regex, '$1$2-$3')
}

export default {
  cpf,
  phone,
  currency,
  formatCurrency,
  formatZipcode
}
