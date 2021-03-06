const $name = document.querySelector('input[data-type="name"]')
const $email = document.querySelector('input[data-type="email"]')
const $password = document.querySelector('input[data-type="password"]')
const $passwordConfirm = document.querySelector('input[data-type="password-confirm"]')

const $buttonSubmit = document.querySelector('.button')
const $inputs = document.querySelectorAll('input')

const $SeePassword = document.querySelector('.see-password')
const $SeeConfirmPassword = document.querySelector('.see-confirm-password')

const $container = document.querySelector('.container')

const TIME_OFF = 2000

const REGEX_DICTIONARY = {
    name: /^[a-zzáàâãéèêíóôõúç][a-zzáàâãéèêíóôõúç ]*$/i,
    email: /^[a-z][^@ ]*[@][a-z]+([.][a-z]+)+$/i
}

function validateInput() {
    const value = this.value
    const dataType = this.dataset.type

    const regex = REGEX_DICTIONARY[dataType]

    const match = value.match(regex)

    if (match || value == "") {
        this.classList.remove('error')
    } else {
        this.classList.add('error')
    }
}

function validatePassword() {
    if($password.value == $passwordConfirm.value || $passwordConfirm.value == '') {
        $password.classList.remove('error')
        $passwordConfirm.classList.remove('error')
    } else {
        $password.classList.add('error')
        $passwordConfirm.classList.add('error')
    }
}

function validadeCheckTerms(){
    const $termChecked = document.querySelector('.terms #terms:checked')

    if (!$termChecked) {
        const $textTerms = document.querySelector('.terms span')
        const $textAlertTerms = document.querySelector('.terms .alert-error-terms')

        $textTerms.classList.add('error-terms-text')

        const pCreated = document.createElement('p')
        const textCreated = document.createTextNode('Necessário aceitar os termos')
        pCreated.appendChild(textCreated)
        $textAlertTerms.appendChild(pCreated)

        setTimeout(() => {
            $textTerms.classList.remove('error-terms-text')
            $textAlertTerms.removeChild(pCreated)
        }, TIME_OFF);
    }
}

function printThank(){
    const $termChecked = document.querySelector('.terms #terms:checked')
    let count = 0

    $inputs.forEach(function ($input) {
        if (!$input.value || $input.classList.contains('error')) count++
    });

    if(!$termChecked) count++

    if(count === 0) {
        const $p = document.createElement('p')
        $p.classList.add('congratulations')
        const $text = document.createTextNode('Registro feito com sucesso! Obrigada')
        $p.appendChild($text)

        $container.innerHTML = ''
        $container.appendChild($p) 
    }
}

$SeePassword.addEventListener('click', function(){
    if($password.type == 'password') {
        $password.type = 'text'
    } else {
        $password.type = 'password'
    }
})

$SeeConfirmPassword.addEventListener('click', function(){
    if($passwordConfirm.type == 'password') {
        $passwordConfirm.type = 'text'
    } else {
        $passwordConfirm.type = 'password'
    }
})

$name.addEventListener('input', validateInput)

$email.addEventListener('input', validateInput)

$passwordConfirm.addEventListener('input', validatePassword)

$buttonSubmit.addEventListener('click', function (event) {
    event.preventDefault()
    validadeCheckTerms()
    
    $inputs.forEach(function ($input) {

        if (!$input.value) {
            $input.classList.add('error-submit')
            setTimeout(() => {
                $input.classList.remove('error-submit')
            }, TIME_OFF);
        }
    });

    printThank()
})
