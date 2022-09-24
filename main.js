/* cardholder name */
let nameCard = document.querySelector('.card__details-name')
let nameInput = document.querySelector('#cardholder')
let nameErrorDiv = document.querySelector('.form__cardnumber--error')

/* cardholder number var */
let numberCard = document.querySelector('.card__details-number')
let numberInput = document.querySelector('#cardnumber')
let numberErrorDiv = document.querySelector('.form__inputnumber--error')

/* cardmonth*/
let monthCard = document.querySelector('.card__month')
let monthInput = document.querySelector('#cardMonth')
let monthErrorDiv = document.querySelector('.form__input-mm--error')

/* cardyear*/
let yearCard = document.querySelector('.card__year')
let yearInput = document.querySelector('#cardYear')
let yearErrorDiv = document.querySelector('.form__input-yy--error')

/* card cvc */
let cvcCard = document.querySelector('.card-back__cvc')
let cvcInput = document.querySelector('#cardcvc')
let cvcErrorDiv = document.querySelector('.form__input-cvc--error')

nameInput.addEventListener('input', () => {
  if (nameInput.value == '') {
    nameCard.innerText = 'JANE APPLESEED'
  } else {
    nameCard.innerText = nameInput.value
  }
})
numberInput.addEventListener('input', (event) => {
  let inputValue = event.target.value
  /* expression para que no coloquen ByteLengthQueuingStrategy, al colocarla daria error */
  numberCard.innerText = numberInput.value

  //validando que no haya letra
  let regExp = /[A-z]/g
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, 'Wrong format')
  } else {
    hideError(numberInput, numberErrorDiv)
    numberInput.value = inputValue
      //para que los usuarios no les agarre el espacio
      .replace(/\s/g, '')
      //para que dar espacio cada 4 numeros
      .replace(/([0-9]{4})/g, '$1 ')
      .trim()
  }
  if (numberInput.value == '') {
    numberCard.innerText = '0000 0000 0000 0000'
  }
})

function showError(divInput, divError, msgError) {
  divError.innerText = msgError
  divInput.style.borderColor = '#f00000'
}

function hideError(divInput, divError, MsgError) {
  divError.innerText = ''
  divInput.style.borderColor = 'hsl(270, 3%, 87%)'
}

//ingreso dinamico del mes
monthInput.addEventListener('input', () => {
  monthCard.innerText = monthInput.value
  if (monthInput.value == '') {
    monthCard.innerText = '00'
  }
  validateLetters(monthInput, monthErrorDiv)
})

//ingreso dinamico del año
yearInput.addEventListener('input', () => {
  yearCard.innerText = yearInput.value
  if (yearInput.value == '') {
    yearCard.innerText = '00'
  }
  validateLetters(yearInput, yearErrorDiv)
})
//cvc card validate
cvcInput.addEventListener('input', () => {
  cvcCard.innerText = cvcInput.value
  validateLetters(cvcInput, cvcErrorDiv)
})

let confirmBtn = document.querySelector('.form__submit')
let namevalidation = false
let numbervalidation = false
let yearvalidation = false
let monthvalidation = false
let cvcvalidation = false

//secciones y formularios

let formSection = document.querySelector('.form')
let thanksSection = document.querySelector('.thanks-section')

confirmBtn.addEventListener('click', (event) => {
  event.preventDefault()
  /* console.log(parseInt(monthInput.value)) */

  //validar nombre
  if (verifyIsField(nameInput, nameErrorDiv)) {
    namevalidation = true
  } else {
    namevalidation = false
  }

  //validar numero de tarjeta
  if (verifyIsField(numberInput, numberErrorDiv) == true) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberErrorDiv, '', false)
      numbervalidation = true
    } else {
      showError(numberInput, numberErrorDiv, 'wrong number')
      numbervalidation = false
    }
  }

  //validar mes
  if (verifyIsField(monthInput, monthErrorDiv) == true) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthErrorDiv, '', false)
      monthvalidation = true
    } else {
      showError(monthInput, monthErrorDiv, 'wrong number')
      monthvalidation = false
    }
  }

  //validar año
  if (verifyIsField(yearInput, yearErrorDiv) == true) {
    if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27) {
      showError(yearInput, yearErrorDiv, '', false)
      yearvalidation = true
    } else {
      showError(yearInput, yearErrorDiv, 'wrong year')
      yearvalidation = false
    }
  }

  //validar cvc
  if (verifyIsField(cvcInput, cvcErrorDiv) == true) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcErrorDiv, '', false)
      cvcvalidation = true
    } else {
      showError(cvcInput, cvcErrorDiv, 'longitud debe ser de 3 num')
      cvcvalidation = false
    }
  }

  if (
    namevalidation == true &&
    numbervalidation == true &&
    yearvalidation == true &&
    monthvalidation == true &&
    cvcvalidation == true
  ) {
    formSection.style.display = 'none'
    thanksSection.style.display = 'block'
  }
})

//funciones

function showError(divInput, divError, msgError, show = true) {
  if (show) {
    divError.innerText = msgError
    divInput.style.borderColor = '#f00000'
  } else {
    divError.innerText = msgError
    divInput.style.borderColor = 'hsl(270,3%, 87%)'
  }
}
//funcion para validar todos los campos
function verifyIsField(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, '', false)
    return true
  } else {
    showError(divInput, divError, 'Can´t be blank')
    return false
  }
}

function validateLetters(input, divError) {
  let regExp = /[A-z]/g
  if (regExp.test(input.value)) {
    showError(input, divError, 'Wrong format, numbers only')
  } else {
    showError(input, divError, '', false)
  }
}
