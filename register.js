const registerForm = document.getElementById ('register-form')
const nameInput = document.getElementById ('name')
const emailInput = document.getElementById ('email')
const passInput = document.getElementById ('contraseña')
const passInput = document.getElementById ('confirmarContraseña2')

// usuarios registrados

const users = JSON.parse (localStorage.getItem (users)) || [];


// guardado en el Local Storage

const saveToLocalStorage = () =>{
    localStorage.setItem ('users', JSON.stringify(users))
}

const isEmpty = (input) =>{
    return !input.value.trim().length 
}

//longitud de la contraseña, si se cumple, retorn true. si no falce

const isBetween =(input, min, max) =>{
return input.value.length >= min && input.value.length < max
}

//validar mail

const isEmailValid = (input) =>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim())

}

//confirmacion de email entre los usuarios

const isExistingMail = (input) =>{
    return users.some((users)=> users.email === input.value.trim())
}

//validar contrasaeña con expresion regular (un carácter numérico,
// uno del alfabeto en minúscula,
// uno en mayúscula,
// uno especial y,
// entre 8 y 16 caracteres de rango)

const isPassSecure =(input)=>{
    const re = /^(?=.\d)(?=.[\u0021-\u002b\u003c-\u0040])(?=.[A-Z])(?=.[a-z])\S{8,16}$/;
    return re.test(input.value.trim())
}

//error al validar un input

const showError = (input, message) =>{
    const formField = input.parentElement
    formField.classList.remove("success")
    formField.classList.add("error")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message 
} 

//input valido
const showSuccess = (input, message) =>{
    const formField = input.parentElement
    formField.classList.remove("error")
    formField.classList.add("success")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = "" 
} ;


//validar input texto

const checkTextInput=(input)=>{
    const minCharacters = 3
    const maxCharacters= 20

    if(isEmpty(input)){
        showError(input,"Este campo es obligatorio")
    return false;
    
} 
if(!isBetween(input, minCharacters,maxCharacters)){
    showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters}`)
return false;
}

showSuccess(input)
return true
};
// mail valido

const checkEmail = (input) =>{
    let valid = false
   

    if(isEmpty(input)){
        showError(input,"El email es obligatorio")
    return;
    
} 

if(!isEmailValid(input)){
    showError(input, "El email no es valido")
return ;
}
if(isExistingMail(input)){
    showError(input,
    "El email ya se ecuentra registrado")
    return;
}

showSuccess(input);
valid=true;
return valid;
};
 
//validacion de contraseña


const checkPassword = (input) =>{
    let valid = false
   

    if(isEmpty(input)){
        showError(input,"El email es obligatorio")
    return;
    
} 

if(!isPassSecure(input)){
    showError(input, "La contraseña debe tener un carácter numérico, uno del alfabeto en minúscula, uno en mayúscula, uno especial y entre 8 y 16 caracteres de rango ")
return ;
}

showSuccess(input);
valid=true;
return valid;
};

//validacion final

const validateForm = (e) =>
    e.preventDesault()
    let isNameValid = checkTextInput (nameInput)
    let isEmailValid = checkEmail (emailInput)
    let isPasswordValid = checkPassword (passInput)
        
        let isValidForm =isNameValid && isEmailValid && isPasswordValid;
    if(isValidForm){
        users.push({
            name: nameInput.value
            email: emailInput.value
            password: passInput.value
        })
        saveToLocalStorage (users)
        alert("te has registrado con éxito")
        window.location.href ="login.html"

    };

    //inicializadora

    const init =() =>{
        registerForm.addEventListener ("submit", validateForm)
        nameInput.addEventListener("input", ()=> checkTextInput (nameInput))
        emailInput.addEventListener("input"()=> checkEmail(emailInput))
        passInput.addEventListener("input",()=>checkPassword(passInput))

    }
    init()
         
