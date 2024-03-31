import Pizza from './Pizza'
import { pizzaData } from '../data'

const Menu = () => {
  const pizzas = pizzaData
  return (
    <main className='menu'>
      <h2>Our menu</h2>
      {pizzas.length > 0 ? (
        <ul className='pizzas'>
          {pizzaData.map((pizza, index) => (
          <Pizza key={index} name={pizza.name} ingredient={pizza.ingredients} photoName={pizza.photoName} price={pizza.price} soldOut={pizza.soldOut}/>
      ))}
        </ul>
      ):(<p>Sorry, we are closed now. Please come back later.</p>)}
    </main>
  )
}

export default Menu