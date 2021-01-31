const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
    // Perform calculation and return calculated value
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

//const keys = document.querySelector('.calculator__keys')
//{for my reference, seems to work the same replacing above 2 lines}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {

        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {

            calculator.dataset.previousKeyType = 'number'

            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'clear') {

            calculator.dataset.previousKeyType = 'clear'

            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'

        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue 
            // and operator because secondValue always exists
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                // Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNum
            }
            key.classList.add('is-depressed')
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {

            calculator.dataset.previousKeyType = 'decimal'

            // Do nothing if string has a dot
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.'
            }
        }


        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            // const secondValue = displayedNum broke the code 
            // study why
          
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                  }
          
              display.textContent = calculate(firstValue, operator, secondValue)
            }
          
            // Set modValue attribute
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
          }

    }
})

// Up to Back to the equal key 
// also have not pushed to github


