"use strict";
let xmlHttp;
let frmDialog;
let hstDialog;

$(() => {
    //crear el objeto xmlHttp
    xmlHttp = crearConexion();
    if (xmlHttp != undefined) {
        $("#cli").on("change", cargarMascotasCli)
    } else {
        Swal.fire("El navegador no soporta AJAX. La página no tendrá funcionalidad");
    }
    $("#fechaN").datepicker({
        maxDate: 0,
        dateFormat: "yy-mm-dd"
    })

    $("#addCan").on("click", anadirMascota);
    $("#verHis").on("click", verHistorial);

    cargarVeterinarios();
    cargarClientes();
    cargarTratamientos();
    confFormValidacion();
    confFrmDialog();
    confHistorialtDialog();
    validarFrm();
})

let grabarConsulta = () => {
    let datos = new FormData();
    datos.append("vet", $("#vet option:selected").attr("dni"));
    datos.append("chip", $("#can option:selected").attr("chip"));
    datos.append("fec", $("#fechaC").val());
    datos.append("hora", $("#horaC").val());
    let observaciones = $(".consulta li").map(function () {
        return $(this).text();
    }).get().join('. ');
    datos.append("observaciones", observaciones);

    fetch("php/saveConsulta.php", {
        method: 'POST',
        body: datos
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        })
        .then((datos) => {
            swalError("success", "Consulta guardada", "");
            limpiarCampos();
        })
        .catch((error) => {
            swalError("error", "Error " + error.status);
        });
}

let anadirMascota = () => {
    if ($("#cli option:selected").val() == "") {
        swalError("error", "Debe seleccionar un cliente", "");
    } else {
        //Abrimos la ventana modal
        frmDialog.dialog("option", "title", "Alta de Perros")
        frmDialog.dialog("open");
    }
}

let verHistorial = () => {
    if ($("#can option:selected").val() == "" || $("#can option:selected").val() == undefined) {
        swalError("error", "Debe seleccionar una mascota", "");
    } else {
        let nomPerr = $("#can option:selected").val();
        hstDialog.dialog("option", "title", "Historial de " + nomPerr);
        hstDialog.dialog("open");

        $.ajax({
            url: "php/historial.php",
            type: "POST",
            async: true,
            data: {
                chip: $("#can option:selected").attr("chip")
            },
            dataType: "json"
        })
            .done(function (responseText, textStatus, jqXHRs) {
                $(".historial").empty();
                $(".historial").append(`<div class="well well-sm table-responsive" id="contenedor"></div>`);
                $("#contenedor").append(`<table id="tablaHst" class="table"><table>`);
                $("#tablaHst").append(`<thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>`);
                $(responseText.datos).each((ind, ele) => {
                    $("#tablaHst tbody").append(`<tr>
                    <td>${ele.fecha}</td>
                    <td>${ele.hora}</td>
                    <td>${ele.observaciones}</td>
                </tr>`)
                });
            })
            .fail(function (response, textStatus, errorThrown) {
                swalError("error", textStatus, errorThrown);
            });
    }
}


let addRegistro = () => {
    //recogemos los datos del formulario
    let datos = new FormData();
    datos.append("chip", $("#chip").val());
    datos.append("nombre", $("#nomPer").val());
    datos.append("raza", $("#raza").val());
    datos.append("fechaN", $("#fechaN").val());
    datos.append("cli", $("#cli option:selected").attr("dni"));

    fetch("php/saveCan.php", {
        method: 'POST',
        body: datos,
    })
        .then(response => response.json())
        .then((response) => {
            if (response.mensaje != "Error") {
                swalError("success", "Mascota insertada correctamente.", "");
                $("#can").append(`<option dueno="${$("#cli option:selected").attr("dni")}" chip="${$("#chip").val()}">${$("#nomPer").val()}</option>`);
                cerrarVentana();
            } else {
                swalError("error", "¡Error! Mascota no insertada", "");
            }
        })
        .catch((err) => {
            Swal.fire("Error: " + err);
        });
}


let cargarMascotasCli = () => {
    xmlHttp.open("POST", "php/perros.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let respuesta = JSON.parse(xmlHttp.responseText);
            $("#can option").remove();
            if (respuesta.datos != "Error") {
                //ordenamos el nombre de las mascotas por orden alfabético
                respuesta.datos.sort((a, b) => {
                    return a.nombre.localeCompare(b.nombre)
                })
                //mostramos en el combo las mascotas pertenecientes al cliente seleccionado
                $(respuesta.datos).each((ind, ele) => {
                    $("#can").append(`<option dueno="${ele.dueno}" chip="${ele.chip}">${ele.nombre}</option>`);
                })
            } else {
                swalError("error", "¡Error! Mascotas no cargadas", "");
            }
        }
    }
    xmlHttp.send("cliente=" + $("#cli option:selected").attr("dni"));
}

let cargarVeterinarios = () => {
    fetch("php/veterinarios.php")
        .then(response => response.json())
        .then((response) => {
            $(response.datos).each((ind, ele) => {
                $("#vet").append(`<option dni="${ele.dni}">${ele.nomApe}</option>`);
            })
        })
        .catch((err) => {
            Swal.fire("Error: " + err);
        });
}

let cargarClientes = () => {
    fetch("php/clientes.php")
        .then(response => response.json())
        .then((response) => {
            $(response.datos).each((ind, ele) => {
                $("#cli").append(`<option dni="${ele.dni}">${ele.nomApe}</option>`);
            })
        })
        .catch((err) => {
            Swal.fire("Error: " + err);
        });
}

function cargarTratamientos() {
    fetch("php/tratamientos.php")
        .then(response => response.json())
        .then((response) => {
            $(response.datos).each((ind, ele) => {
                $(".tratamientos").append(`<li id="${ele.id}">${ele.descripcion}</li>`)
            })
            // $(".tratamientos li").on("dblclick", anadirTratConsulta);
            $('.card-body li').on("dblclick", function () {
                let $list = $(this).closest('.card-body');
                let $targetList = $('.card-body').not($list)
                $(this).closest('li').appendTo($targetList);
                $(this).text($targetList.data('li-text'));
            });
        })
        .catch((err) => {
            Swal.fire("Error: " + err);
        });
}

function validarFrm() {
    $(".form-horizontal").validate({
        //estilo
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback"),
                error.insertAfter(element)
        },
        //border un error
        highlight: function (element) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        //especificamos los objetos a través del atributo name. Siempre se hace así, a través del name.
        rules: {
            vet: "required",
            cli: "required",
            can: "required",
            fechaC: "required",
            horaC: "required"
        },
        messages: {
            vet: {
                required: "El veterinario es obligatorio.",
            },
            cli: {
                required: "El cliente es obligatorio."
            },
            can: {
                required: "La mascota es obligatoria."
            },
            fechaC: {
                required: "La fecha de la consulta es obligatoria."
            },
            horaC: {
                required: "La hora de la consulta es obligatoria."
            }

        },
        submitHandler: function (form) { //evento al enviar el formulario
            if ($(".form-horizontal button:submit").text() === "Guardar") {
                grabarConsulta();
            } else {
                swalError("warning", "Debes rellenar los campos.")
            }
        }
    });
}


let confHistorialtDialog = () => {
    hstDialog = $(".historial").dialog({
        autoOpen: false, //para que no se abra hasta que nosotros lo digamos
        width: 1200,
        modal: true //para que la ventana no se cierre y no podamos hacer otra cosa en segundo plano
    });
}

let confFrmDialog = () => {
    frmDialog = $("#perro").dialog({
        autoOpen: false, //para que no se abra hasta que nosotros lo digamos
        width: 500,
        modal: true //para que la ventana no se cierre y no podamos hacer otra cosa en segundo plano
    });
};


let confFormValidacion = () => {
    //establecer nueva regla. Establecemos el nombre del nuevo atributo y lo que va a hacer.
    $.validator.addMethod("regExpNom", function (value, element, expresion) {
        let reg = new RegExp(expresion);
        return this.optional(element) || reg.test(value)
    })
    $(".frmAddPerro").validate({
        //aspecto de los mensajes
        errorElement: "em", //es una clase propia de la librería
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        },
        //establecer borde al objeto del error
        highlight: function (element) {
            $(element).addClass("is-invalid").removeClass("is-valid")
        },
        unhighlight: function (element) { //validación correcta
            $(element).addClass("is-valid").removeClass("is-invalid")
        },
        rules: {
            //especificamos los objetos a través del atributo name. Siempre se hace así, a través del name.
            chip: {
                required: true,
                minlength: 4,
                maxlength: 14
            },
            nomPer: {
                required: true,
                regExpNom: /^[a-zá-ú\sñ]+$/i,
            },
            fechaN: {
                required: true,
                date: true
            },
            raza: {
                required: true,
                minlength: 3,
                maxlength: 20
            }
        },
        messages: {
            chip: {
                required: "El chip de la mascota es obligatorio.",
                minlength: "Mínimo de caracteres es 4"
            },
            nomPer: {
                regExpNom: "El formato no es correcto. Permite solo letras"
            },
            fechaN: {
                required: "La fecha de nacimiento es obligatoria."
            },
            raza: {
                required: "La raza de la mascota es obligatoria."
            }
        },
        submitHandler: () => { //el botón submit va a realizar este evento automáticamente
            if ($(".frmAddPerro button:submit").text() === "Añadir") {
                addRegistro();
            } else {
                swalError("error", "Hay un error con el button submit", "");
            }
        }
    })
};

let swalError = (icono, titulo, texto) => {
    Swal.fire({
        position: 'center',
        icon: icono,
        timer: 1000,
        showConfirmButton: false,
        title: titulo,
        text: texto
    })
}

let cerrarVentana = () => {
    frmDialog.dialog("close");
    $(".frmAddPerro").val(""); //limpiar las cajas de texto
    $(".frmAddPerro").removeClass("is-valid").removeClass("is-invalid");
}

function limpiarCampos() {
    $(".form-horizontal input").val("").removeClass("is-valid").removeClass("is-invalid");
    $(".form-horizontal select").val("").removeClass("is-valid").removeClass("is-invalid");
    $(".tratamientos li").remove();
    $(".consulta li").remove();
    cargarTratamientos();
}




