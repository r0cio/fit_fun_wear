window.addEventListener('load', function () {
        // Validaciones en formulario añadir atributos  
    // Se capturan los elementos
    let nombre = document.querySelector('.add-product-nombre');
    let errorNombre = document.querySelector('.add-product-error-nombre');
    let descripcion = document.querySelector('.add-product-descripcion');
    let errorDescripcion = document.querySelector('.add-product-error-descripcion');
    let modelo = document.querySelector('.add-product-modelo');
    let errorModelo = document.querySelector('.add-product-error-modelo');

    nombre.addEventListener('click', function () {
        if (nombre.value == '') {
            nombre.classList.add('border-danger');
            errorNombre.innerHTML = "Debes especificar el nombre del producto";
            errorNombre.classList.remove('d-none');
            errorNombre.classList.add('d-block');
        } else {
            nombre.classList.remove('border-danger');
        }
    })

    nombre.addEventListener('input', function () {
        if (nombre.value.length < 3) {
            nombre.classList.add('border-danger');
            errorNombre.innerHTML = "El nombre del producto debe tener al menos 3 caracteres";
            errorNombre.classList.remove('d-none');
            errorNombre.classList.add('d-block');
        } else {
            nombre.classList.remove('border-danger');
            nombre.classList.add('border-success');
            errorNombre.classList.add('d-none');
            errorNombre.classList.remove('d-block');
        }
    })

    descripcion.addEventListener('input', function () {
        if (descripcion.value == '') {
            descripcion.classList.add('border-danger');
            errorDescripcion.innerHTML = "Debes darle una descripción al producto";
            errorDescripcion.classList.remove('d-none');
            errorDescripcion.classList.add('d-block');
        } else {
            descripcion.classList.remove('border-danger');
            descripcion.classList.add('border-success');
            errorDescripcion.classList.add('d-none');
            errorDescripcion.classList.remove('d-block');
        }
    })

    modelo.addEventListener('click', function () {
        if (modelo.value == '') {
            modelo.classList.add('border-danger');
            errorModelo.innerHTML = "Falta la descripción del producto";
            errorModelo.classList.remove('d-none');
            errorModelo.classList.add('d-block');
        } else {
            modelo.classList.remove('border-danger');
            modelo.classList.add('border-success');
            errorModelo.classList.add('d-none');
            errorModelo.classList.remove('d-block');
        }
    })

    modelo.addEventListener('input', function () {
        if (modelo.value.length < 5) {
            modelo.classList.add('border-danger');
            errorModelo.innerHTML = "El modelo del producto debe tener al menos 5 caracteres";
            errorModelo.classList.remove('d-none');
            errorModelo.classList.add('d-block');
        } else {
            modelo.classList.remove('border-danger');
            modelo.classList.add('border-success');
            errorModelo.classList.add('d-none');
            errorModelo.classList.remove('d-block');
        }
    })
})