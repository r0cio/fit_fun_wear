/* Validaciones en los formularios */
window.addEventListener('load', function () {

    // Validaciones en formulario añadir atributos  
    // Se capturan los elementos
    let categoria = document.querySelector('.add-attribute-categoria');
    let errorCategoria = document.querySelector('.add-attribute-error-categoria');
    let color = document.querySelector('.add-attribute-color');
    let errorColor = document.querySelector('.add-attribute-error-color');
    let talla = document.querySelector('.add-attribute-talla');
    let errorTalla = document.querySelector('.add-attribute-error-talla');
    let precio = document.querySelector('.add-attribute-precio');
    let errorPrecio = document.querySelector('.add-attribute-error-precio');
    let descuento = document.querySelector('.add-attribute-descuento');
    let errorDescuento = document.querySelector('.add-attribute-error-descuento');
    let cantidad = document.querySelector('.add-attribute-cantidad');
    let errorCantidad = document.querySelector('.add-attribute-error-cantidad');

    // Validación select categoria con el evento click
    categoria.addEventListener('click', function () {
        if (categoria.value != '') { // si ya se selecciono una categoria
            categoria.classList.add('border-success');
            if (categoria.classList.contains('border-danger')) {
                categoria.classList.remove('border-danger');
                errorCategoria.classList.remove('d-block');
                errorCategoria.classList.add('d-none');
            }
        } else {
            categoria.classList.add('border-danger');
            errorCategoria.innerHTML = "Elige una categoria";
            errorCategoria.classList.remove('d-none');
            errorCategoria.classList.add('d-block');
        }
    })

    // Validación género
    let generoH = document.querySelector('.add-attribute-genero-h');
    let generoM = document.querySelector('.add-attribute-genero-m');
    let generoU = document.querySelector('.add-attribute-genero-u');
    let errorGenero = document.querySelector('.add-attribute-error-genero');

    // Validación disponible
    let disponibleSi = document.querySelector('.add-attribute-disponible-si');
    let disponibleNo = document.querySelector('.add-attribute-disponible-no');
    let errorDisponible = document.querySelector('.add-attribute-error-disponible');

    if (color || talla) {

        // Validación select color con el evento click
        color.addEventListener('click', function () {

            if (generoH.checked == false && generoM.checked == false && generoU.checked == false) {
                errorGenero.innerHTML = "No seleccionaste un género";
                errorGenero.classList.remove('d-none');
                errorGenero.classList.add('d-block');
            } else {
                if (errorGenero.classList.contains('d-block')) {
                    errorGenero.classList.remove('d-block');
                    errorGenero.classList.add('d-none');
                }
            }

            if (disponibleSi.checked == false && disponibleNo.checked == false) {
                errorDisponible.innerHTML = "No especificaste si el producto estará disponible o no";
                errorDisponible.classList.remove('d-none');
                errorDisponible.classList.add('d-block');
            } else {
                if (errorDisponible.classList.contains('d-block')) {
                    errorDisponible.classList.remove('d-block');
                    errorDisponible.classList.add('d-none');
                }
            }

            if (color.value != '') { // si ya se selecciono un color
                color.classList.add('border-success');
                if (color.classList.contains('border-danger')) {
                    color.classList.remove('border-danger');
                    errorColor.classList.remove('d-block');
                    errorColor.classList.add('d-none');
                }
            } else {
                color.classList.add('border-danger');
                errorColor.innerHTML = "No seleccionaste un color";
                errorColor.classList.remove('d-none');
                errorColor.classList.add('d-block');
            }
        })

        // Validación select talla con el evento click
        talla.addEventListener('click', function () {

            // Comprobación genero y disponibilidad
            if (generoH.checked == false && generoM.checked == false && generoU.checked == false) {
                errorGenero.innerHTML = "Elige un género";
                errorGenero.classList.remove('d-none');
                errorGenero.classList.add('d-block');
            } else {
                if (errorGenero.classList.contains('d-block')) {
                    errorGenero.classList.remove('d-block');
                    errorGenero.classList.add('d-none');
                }
            }

            if (disponibleSi.checked == false && disponibleNo.checked == false) {
                errorDisponible.innerHTML = "Debes especificar si el producto estará disponible o no";
                errorDisponible.classList.remove('d-none');
                errorDisponible.classList.add('d-block');
            } else {
                if (errorDisponible.classList.contains('d-block')) {
                    errorDisponible.classList.remove('d-block');
                    errorDisponible.classList.add('d-none');
                }
            }

            if (talla.value != '') { // si ya se selecciono un color
                talla.classList.add('border-success');
                if (talla.classList.contains('border-danger')) {
                    talla.classList.remove('border-danger');
                    errorTalla.classList.remove('d-block');
                    errorTalla.classList.add('d-none');
                }
            } else {
                talla.classList.add('border-danger');
                errorTalla.innerHTML = "No seleccionaste una talla";
                errorTalla.classList.remove('d-none');
                errorTalla.classList.add('d-block');
            }
        })

    }

    // Validación precio del producto
    precio.addEventListener('click', function () {
        if (precio.value == '') {
            precio.classList.add('border-danger');
            errorPrecio.innerHTML = "Escribe el precio del producto";
            errorPrecio.classList.remove('d-none');
            errorPrecio.classList.add('d-block');
        } else {
            precio.classList.remove('border-danger');
        }
    })

    precio.addEventListener('input', function () {
        if (precio.value == '') {
            precio.classList.add('border-danger');
            errorPrecio.innerHTML = "Escribe el precio del producto";
            errorPrecio.classList.remove('d-none');
            errorPrecio.classList.add('d-block');
        } if (precio.value <= 0) {
            precio.classList.add('border-danger');
            errorPrecio.innerHTML = "Escribe un precio de producto que sea mayor que cero";
            errorPrecio.classList.remove('d-none');
            errorPrecio.classList.add('d-block');
        } else {
            precio.classList.remove('border-danger');
            precio.classList.add('border-success');
            errorPrecio.classList.add('d-none');
            errorPrecio.classList.remove('d-block');
        }
    })

    // Validacion descuento del producto
    descuento.addEventListener('input', function () {
        if (descuento.value.length >= 3 || descuento.value == '') {            
            descuento.classList.add('border-danger');
            errorDescuento.innerHTML = "Escribe un descuento de menos del 100%";
            errorDescuento.classList.remove('d-none');
            errorDescuento.classList.add('d-block');
        } else if (descuento.value < 0) {            
            descuento.classList.add('border-danger');
            errorDescuento.innerHTML = "Escribe un descuento positivo";
            errorDescuento.classList.remove('d-none');
            errorDescuento.classList.add('d-block');
        } else {
            descuento.classList.remove('border-danger');            
            errorDescuento.classList.add('d-none');
            errorDescuento.classList.remove('d-block');
        }
    })

    // Validación cantidad del producto
    cantidad.addEventListener('click', function () {
        if (cantidad.value == '') {
            cantidad.classList.add('border-danger');
            errorCantidad.innerHTML = "Escribe la cantidad de productos";
            errorCantidad.classList.remove('d-none');
            errorCantidad.classList.add('d-block');
        } else {
            cantidad.classList.remove('border-danger');
        }
    })

    cantidad.addEventListener('input', function () {
        if (cantidad.value == '') {
            cantidad.classList.add('border-danger');
            errorCantidad.innerHTML = "Escribe la cantidad de productos";
            errorCantidad.classList.remove('d-none');
            errorCantidad.classList.add('d-block');
        } if (cantidad.value <= 0) {
            cantidad.classList.add('border-danger');
            errorCantidad.innerHTML = "Escribe una cantidad de producto que sea mayor que cero";
            errorCantidad.classList.remove('d-none');
            errorCantidad.classList.add('d-block');
        } else {
            cantidad.classList.remove('border-danger');
            cantidad.classList.add('border-success');
            errorCantidad.classList.add('d-none');
            errorCantidad.classList.remove('d-block');
        }
    })

})