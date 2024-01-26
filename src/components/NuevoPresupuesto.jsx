import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje]=useState("");

    //* Validar Presupuesto con el siguiente code
    const handlePresupuesto = (e) => {
        e.preventDefault();
        //console.log("Enviando Formulario")
        if(!presupuesto|| presupuesto<0){
            //alert("No es un presupuesto valido")
            setMensaje("No es un presupuesto valido")
            return 
        }
        setMensaje("");
        setIsValidPresupuesto(true);
    }

  return (
    
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type="number"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={e => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value="Añadir"/>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        </form>
    </div>
    
  )
}

export default NuevoPresupuesto
