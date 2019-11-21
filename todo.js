const app = new Vue({
    el: '#app',
    data: {
        titulo: 'TODO-TODAY',
        tareas: [],
        nuevaTarea: '',
        // Esto es igual pero para la lista de tareas completas
        tareasCompletadas: [],
        tareaCompleta: '',
    },
    methods: {
        agregarTarea: function () {
            this.tareas.push({
                nombre: this.nuevaTarea,
                estado: false,
            });
            this.nuevaTarea = '';
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));

        },
        //Este va a ser el nuevo completar, cuando lo sepa hacer
        editarTarea: function (index) {
            this.tareas[index].estado = true;
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));

        },
        eliminar: function (index) {
            this.tareas.splice(index, 1);
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));

        },

        completarTarea: function (index) {
            //Elimino la tarea de las tareas, y la creo en tareas completadas
            nombre_temp = this.tareas[index].nombre;
            this.tareas.splice(index, 1);
            this.tareasCompletadas.push({
                nombre: nombre_temp,
                estado: true,
            });
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));
        },

        deshacerTarea: function (index) {
            nombre_temp = this.tareasCompletadas[index].nombre;
            this.tareasCompletadas.splice(index, 1);
            this.tareas.push({
                nombre: nombre_temp,
                estado: true,
            });
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));
        },
        eliminarCompleta: function (index) {
            this.tareasCompletadas.splice(index, 1);
            localStorage.setItem('lista_tareas', JSON.stringify(this.tareas));
            localStorage.setItem('lista_tareas_completa', JSON.stringify(this.tareasCompletadas));

        }
    },
    created: function () {
        let datos_tareas = JSON.parse(localStorage.getItem('lista_tareas'))
        if (datos_tareas === null) {
            this.tareas = [];
        }
        else {
            this.tareas = datos_tareas;
        }

        let datos_tareas_complet = JSON.parse(localStorage.getItem('lista_tareas_completa'))
        if (datos_tareas_complet === null) {
            this.tareasCompletadas = [];
        }
        else {
            this.tareasCompletadas = datos_tareas_complet;
        }
    }


});