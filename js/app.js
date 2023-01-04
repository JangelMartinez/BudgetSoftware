const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta choche', 1500.00)
]

const gastos = [
    new Gastos('Alquiler', 900.00),
    new Gastos('Ropa', 400.00)
]

let chargeApp = () =>{
    chargeHeader()
    chargeData(ingresos, 'ingresos')
    chargeData(gastos, 'egresos')
    document.getElementById('tipo').value = 'ingresos'
    document.getElementById('descripcion').value = ''
    document.getElementById('valor').value = ''
}


let addData = ( myData ) =>{
    let total = 0;
    for(let data of myData){
        total += data.valor;
    }
    
    return total
}

let chargeHeader = () => {
    let presupuesto = addData(ingresos) - addData(gastos)

    let porcentajeGastos = addData(gastos)/ addData(ingresos)

    if(isNaN(porcentajeGastos)){
        porcentajeGastos = 0;
    }

    document.getElementById('presupuesto').innerHTML = formatCurrency(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatPercent(porcentajeGastos);
    document.getElementById('ingresos').innerHTML = formatCurrency(addData(ingresos));
    document.getElementById('gastos').innerHTML = formatCurrency(addData(gastos))

}

const formatCurrency = (valor) =>{
    return valor.toLocaleString('es-ES', {style:'currency', currency: 'EUR', minimumFractionDigits: 2});
}

const formatPercent = (valor) =>{
    return valor.toLocaleString('es-ES', {style:'percent', minimumFractionDigits: 1});
}

const chargeData = (data, type) =>{
    let dataHTML = ''
    for(let value of data){
        dataHTML += AddDataHTML(value, type);
    }

    let text = 'lista-' + type

    document.getElementById(text).innerHTML = dataHTML;
}

const AddDataHTML = (value, type) =>{

    let porcentajeGastos = value.valor/ addData(ingresos)

    let dataHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${value.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatCurrency(value.valor)}</div>`
            + (type === 'egresos' ? `<div class="elemento_porcentaje">${formatPercent(porcentajeGastos)}</div>`: '')
            +
            `
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick='deleteData(${value.id}, "${type}")'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `

    return dataHTML;

}

const deleteData = (id, type) => {

    let newData = []
    let indexToDelete = null

    if(type == 'ingresos'){
        indexToDelete = ingresos.findIndex( ingreso => ingreso.id === id);
        ingresos.splice(indexToDelete, 1);        
    }else{
        indexToDelete = gastos.findIndex( gasto => gasto.id === id);
        gastos.splice(indexToDelete, 1);        
    }

    chargeApp()
}

const newData = () =>{
    let forma = document.forms['forma']

    let tipo = forma['tipo']
    let descripcion = forma['descripcion']
    let valor = forma['valor']

    if(descripcion.value !== undefined && descripcion.value !== null && valor.value !== undefined && valor.value !== null){
        if(tipo.value === 'ingresos'){
            ingresos.push( new Ingreso(descripcion.value, Number(valor.value)))
        }else if(tipo.value === 'gastos'){
            gastos.push( new Gastos(descripcion.value, Number(valor.value)))

        }
    }

    chargeApp()
}