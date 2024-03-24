import cartContext from '../context'

import './index.css'

const EachFoodItem = props => {
  const {food} = props
  console.log(food)

  return (
    <cartContext.Consumer>
      {value => {
        const {onDecrement, onIncrement} = value

        const onDecrementItem = event => {
          onDecrement(event.target.id)
        }

        const onIncrementItem = event => {
          onIncrement(event.target.id)
        }

        return (
          <div className="bgFoodItem">
            <div>
              <h1 className="dishNames">{food.dishName}</h1>
              <p className="currency">
                {food.dishCurrency} {food.dishPrice}
              </p>
              <p className="foodDescription">{food.dishDescription}</p>

              {food.dishAvailable === false ? (
                <p>Not available</p>
              ) : (
                <div className="buttons">
                  <button
                    onClick={onDecrementItem}
                    className="minus"
                    type="button"
                    id={food.id}
                  >
                    -
                  </button>
                  <p>{food.count}</p>
                  <button
                    onClick={onIncrementItem}
                    className="plus"
                    type="button"
                    id={food.id}
                  >
                    +
                  </button>
                </div>
              )}

              {food.addOnCat.length !== 0 && (
                <p className="customizations">Customizations available</p>
              )}
            </div>

            <div className="dishImageAndCalories">
              <p className="calories">{food.dishCalories} calories</p>
              <div>
                <img
                  className="dishImage"
                  src={food.dishImage}
                  alt={food.dishName}
                />
              </div>
            </div>
          </div>
        )
      }}
    </cartContext.Consumer>
  )
}

export default EachFoodItem
