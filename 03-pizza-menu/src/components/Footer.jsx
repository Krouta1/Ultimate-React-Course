import React from 'react'
import '../index.css'

const Footer = () => {
  const hours = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hours < openHour || hours >= closeHour ? false : true

  // if (hours < openHour || hours >= closeHour) alert('Sorry, we are closed now'); else alert('Welcome to Fast React Pizza Co.')

  return (
    <footer className='footer'>
      {isOpen && (
        <div className='order'>
          <p>We are open until {closeHour}:00. Come visit use or order online.
          </p>
          <button className='btn'>Order</button>
        </div>
      )}
    </footer>
  )
}

export default Footer