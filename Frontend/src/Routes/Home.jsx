import React from 'react'
import Card from '../Components/Card'
import { useDentiStates } from '../Context/Context'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Home = () => {

  const {state} = useDentiStates()

  return (
    <main className="" >
      <h1>Home</h1>
      <div className='card-grid'>
        {state.dentistas.map(dentista => (<Card dentista={dentista} key={dentista.id}/>))}
      </div>
    </main>
  )
}

export default Home