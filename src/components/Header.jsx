import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'
const Header = ({
    gastos,
    presupuesto,  
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    setGastos
}) => {
  return (
    <header>
    <h1>Planificador de Gastos</h1>
    {isValidPresupuesto ? (
      //True
      <ControlPresupuesto
      gastos={gastos} 
      presupuesto={presupuesto}
      setGastos={setGastos}
      setPresupuesto={setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
    ): ( 
      //False
    <NuevoPresupuesto
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />
    )}
  
  </header>
  )
}

export default Header
