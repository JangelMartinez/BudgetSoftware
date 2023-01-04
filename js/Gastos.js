class Gastos extends Dato{

    static contadorGastos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Gastos.contadorGastos;
    }

    get id(){
        return this._id;
    }
}