// Validaciones en los formularios de usuario
window.addEventListener('load', function () {

    //Campo email
    emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let campoEmail = document.querySelector("input.email");
    let errorEmail = document.querySelector("p.email-error");

    campoEmail.addEventListener('click', function () {
        if (campoEmail.value == '') {
            campoEmail.classList.add('border-danger');
            errorEmail.innerHTML = "Rellena el campo de correo electrónico";
            errorEmail.classList.remove('d-none');
            errorEmail.classList.add('d-block');
        } else {
            campoEmail.classList.remove('border-danger');
        }
    })

    //emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
    campoEmail.addEventListener('input', function () {

        if (campoEmail.value == '') {
            campoEmail.classList.add('border-danger');
            errorEmail.innerHTML = "Escribe tu correo electrónico";
            errorEmail.classList.remove('d-none');
            errorEmail.classList.add('d-block');
        } else if (emailRegex.test(campoEmail.value)) {
            campoEmail.classList.remove('border-danger')
            campoEmail.classList.add('border-success')
            errorEmail.classList.add('d-none');
            errorEmail.classList.remove('d-block')
            /**/
           //alert("ok")
          } else {
           /* */
           campoEmail.classList.add('border-danger')
           errorEmail.innerHTML = "Formato de correo electrónico inválido";
           errorPrecio.classList.remove('d-none');
           errorPrecio.classList.add('d-block');
           //alert("mal")
                
          }
    })

    //Campo password
    let campoPassword = document.querySelector(".password");
    let errorPassword = document.querySelector("p.password-error");

    campoPassword.addEventListener('click', function () {
        if (campoPassword.value == '') {
            campoPassword.classList.add('border-danger');
            errorPassword.innerHTML = "Rellena el campo de contraseña";
            errorPassword.classList.remove('d-none');
            errorPassword.classList.add('d-block');
        } else {
            campoEmail.classList.remove('border-danger');
        }
    })

    campoPassword.addEventListener('input', function () {

        if (campoPassword.value == '') {
            campoPassword.classList.add('border-danger');
            errorPassword.innerHTML = "Escribe tu contraseña";
            errorPassword.classList.remove('d-none');
            errorPassword.classList.add('d-block');
        } else if (campoPassword.value.length > 7) {
            campoPassword.classList.remove('border-danger')
            campoPassword.classList.add('border-success')
            errorPassword.classList.add('d-none');
            errorPassword.classList.remove('d-block')
            /**/
           //alert("ok")
          } else {
           campoPassword.classList.add('border-danger')
           errorPassword.innerHTML = "Por seguridad tu contraseña debe contener 8 caracteres o más";
           errorPassword.classList.remove('d-none');
           errorPassword.classList.add('d-block');
           //alert("mal")
                
          }
       
    })

    //Campo Nombre
    let campoName = document.querySelector(".name");
    let errorName = document.querySelector("p.name-error");

    campoName.addEventListener('click', function () {
        if (campoName.value == '') {
            campoName.classList.add('border-danger');
            errorName.innerHTML = "Rellena el campo de nombre";
            errorName.classList.remove('d-none');
            errorName.classList.add('d-block');
        } else {
            campoName.classList.remove('border-danger');
        }
    })

    campoName.addEventListener('input', function () {

        if (campoName.value == '') {
            campoName.classList.add('border-danger');
            errorName.innerHTML = "Escribe tu nombre";
            errorName.classList.remove('d-none');
            errorName.classList.add('d-block');
        } else if (campoName.value.length > 3) {
            campoName.classList.remove('border-danger')
            campoName.classList.add('border-success')
            errorName.classList.add('d-none');
            errorName.classList.remove('d-block')
            /**/
           //alert("ok")
          } else {
           campoName.classList.add('border-danger')
           errorName.innerHTML = "Tu nombre debe contener más de 3 caracteres";
           errorName.classList.remove('d-none');
           errorName.classList.add('d-block');
           //alert("mal")
                
          }
       
    })

    //Campo Apellido
    let campoLastName = document.querySelector(".last_name");
    let errorLastName = document.querySelector("p.last_name-error");

    campoLastName.addEventListener('click', function () {
        if (campoLastName.value == '') {
            campoLastName.classList.add('border-danger');
            errorLastName.innerHTML = "Rellena el campo de apellido";
            errorLastName.classList.remove('d-none');
            errorLastName.classList.add('d-block');
        } else {
            campoLastName.classList.remove('border-danger');
        }
    })

    campoLastName.addEventListener('input', function () {

        if (campoLastName.value == '') {
            campoLastName.classList.add('border-danger');
            errorLastName.innerHTML = "Escribe tu apellido";
            errorLastName.classList.remove('d-none');
            errorLastName.classList.add('d-block');
        } else if (campoLastName.value.length > 3) {
            campoLastName.classList.remove('border-danger')
            campoLastName.classList.add('border-success')
            errorLastName.classList.add('d-none');
            errorLastName.classList.remove('d-block')
            /**/
           //alert("ok")
          } else {
           campoLastName.classList.add('border-danger')
           errorLastName.innerHTML = "Tu apellido debe contener más de 3 caracteres";
           errorLastName.classList.remove('d-none');
           errorLastName.classList.add('d-block');
           //alert("mal")
                
          }
       
    })

    /* let formulario = this.document.querySelector("form.reservation");
 
    formulario.addEventListener("submit", function(e){
        let errores = [];

        // para campo email
        let campoEmail = document.querySelector("input.email");

        if(campoEmail.value == ""){
            errores.push("Debe llenar el campo de correo electrónico")
        }

        // para campo password

        let campoPassword = document.querySelector("input.password");

        if(campoPassword.value == ""){
            errores.push("Debe llenar el campo de contraseña")
        }

        if (errores.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++ ){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    }) */
    
})