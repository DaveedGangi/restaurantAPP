import {AiOutlineShoppingCart} from 'react-icons/ai'

import cartContext from '../context'

import './index.css'

const NavBar = props => {
  const details = props

  return (
    <cartContext.Consumer>
      {value => {
        const {listOfItems} = value
        console.log(listOfItems)
        return (
          <div className="bgNav">
            <h1 className="restaurantName">{details.data.restaurant_name}</h1>
            <div className="flexingCounter">
              <p className="myOrders">My Orders</p>
              <div className="counter">
                <p className="spanCount"> {details.listOfItems.length}</p>
                <div className="Logo">
                  <AiOutlineShoppingCart />
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </cartContext.Consumer>
  )
}

export default NavBar
