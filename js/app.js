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

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

calcularRestante () {
    const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0 );
   this.restante = this.presupuesto - gastado;
   console.log(this.restante);

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
        if (tipo === 'error') {
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
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }

    ////Agregar gastos al listado

    agregarGastoListado(gastos) {
        this.limpiarHTML();
        //iterar sobre los gastos
        gastos.forEach(gasto => {
            const { cantidad, nombre, id } = gasto;

            //Crear un LI

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //Agregar el HTML gasto
            nuevoGasto.innerHTML = `
            ${nombre}
            <span class="gasto">${cantidad} € </span>
        `;


            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            nuevoGasto.appendChild(btnBorrar);

            //Agregar el html
            listado.appendChild(nuevoGasto);

        });
    }
limpiarHTML(){
    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }
};

actualizarRestante(restante){
  
    document.querySelector('#restante').textContent = restante;
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
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;

    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //Generar objeto con el gasto

    const gasto = { nombre, cantidad, id: Date.now() };

    //añade nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente');

    //Imprimir los gastos
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);


    // Actualiza el presupuesto restante
    const { restante } = presupuesto;

    // Actualizar cuanto nos queda
    ui.actualizarRestante(restante)
    
    formulario.reset();




}

