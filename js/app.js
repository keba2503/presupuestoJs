//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const listado = document.querySelector('#gastos ul');

//Eventos
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

}

class UI {
    insertarPresupuesto(cantidad) {
        //extrayendo valor
        const { presupuesto, restante } = cantidad;

        //Agregando al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }
        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        const primario = document.querySelector('.primario');
        primario.appendChild(divMensaje)

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
             document.querySelector('.primario .alert').remove();
        }, 3000);
   }
}

const ui = new UI();

let presupuesto;

//Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');


    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);


    ui.insertarPresupuesto(presupuesto);

}

//Agregar gastos

function agregarGasto(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

  // Comprobar que los campos no esten vacios
  if(nombre === '' || cantidad === '') {
    // 2 parametros: mensaje y tipo
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
}


}

