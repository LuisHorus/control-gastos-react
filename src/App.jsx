import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Filtros from "./components/Filtros"
import Modal from './components/Modal';
import {generarId} from "./helpers"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"



function App() {
  const [gastos,setGastos]=useState(
    localStorage.getItem("gastos")?JSON.parse(localStorage.getItem("gastos")):[]
  )
  const [presupuesto, setPresupuesto] = useState(
   Number(localStorage.getItem("presupuesto"))??0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro]=useState("")
  const [gastosFiltrados, setGastosFiltrados]=useState([])

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(()=>{
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  useEffect(()=>{
    localStorage.setItem("presupuesto",presupuesto??0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem("gastos", JSON.stringify(gastos)??[])

  },[gastos])

  useEffect(()=>{
    if(filtro){
      //Filtrar gastos por Categoria
      const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  useEffect(()=>{
    const presupuestoLs = Number(localStorage.getItem("presupuesto"))??0
    if(presupuestoLs>0){
      setIsValidPresupuesto(true)
    }
  },[])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }
  const guardarGasto=gasto=>{
    if(gasto.id){
      //Actulizar
      const gastosActualizados =gastos.map(gastoState=>gastoState.id === gasto.id?gasto:gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      //Nuevos Gastos
      gasto.id=generarId();
      gasto.fecha=Date.now()
      setGastos([...gastos,gasto])
    }
    setAnimarModal(false)
    setTimeout(()=>{
        setModal(false)
    },500)
  }
  const eliminarGasto = id =>{
    const gastoActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastoActualizados)
  }

  return (
    <div className={modal ? "fijar":""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
       )}
      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                  />}
    </div>
  )
}

export default App