import {Component} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'

import EachFoodItem from '../EachFoodDetails'

import cartContext from '../context'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class AllProducts extends Component {
  state = {
    foodsData: '',
    count: 0,
    tabs: [],
    tabName: 'Salads and Soup',
    menuListData: [],
    statusData: apiStatus.initial,
    listOfItems: [],
  }

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    this.setState({statusData: apiStatus.inProgress})
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )

    const responseToJson = await response.json()

    if (response) {
      const {tabName} = this.state
      const data = responseToJson[0]
      console.log(data)

      const details = data.table_menu_list.map(each => ({
        id: each.menu_category_id,
        name: each.menu_category,
      }))

      const menuDetails = data.table_menu_list.filter(
        each => each.menu_category === tabName,
      )

      console.log(menuDetails)
      const menuLists = menuDetails[0].category_dishes.map(eachDish => ({
        id: eachDish.dish_id,
        addOnCat: eachDish.addonCat,
        dishAvailable: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        nxtUrl: eachDish.nexturl,
        count: 0,
      }))
      console.log(menuLists)
      console.log('Menus')

      this.setState({
        foodsData: data,
        tabs: details,
        menuListData: menuLists,
        statusData: apiStatus.success,
      })
    } else {
      this.setState({statusData: apiStatus.failure})
    }
  }

  addSelectTab = event => {
    this.setState({tabName: event.target.value})
    this.fetchApi()
  }

  incrementCartItemQuantity = id => {
    console.log(id)
    const {menuListData, listOfItems} = this.state
    const findItem = menuListData.find(each => each.id === id)
    console.log(findItem)
    if (findItem) {
      const dataUpdate = menuListData.map(each => {
        if (each.id === id) {
          const increaseCount = each.count + 1
          return {...each, count: increaseCount}
        }
        return each
      })
      this.setState({menuListData: dataUpdate})
    }

    const basedOnId = listOfItems.find(each => each === id)
    if (basedOnId) {
      this.setState({listOfItems: [...listOfItems]})
    } else {
      this.setState(prevState => ({
        listOfItems: [...prevState.listOfItems, id],
      }))
    }
  }

  decrementCartItemQuantity = id => {
    console.log(id)
    const {menuListData, listOfItems} = this.state
    const findItem = menuListData.find(each => each.id === id)
    console.log(findItem)
    if (findItem.count >= 1) {
      const dataUpdate = menuListData.map(each => {
        if (each.id === id) {
          const increaseCount = each.count - 1
          if (increaseCount <= 0) {
            const removing = listOfItems.filter(eachV => eachV !== id)
            this.setState({listOfItems: removing})
          }
          return {...each, count: increaseCount}
        }
        return each
      })

      this.setState({menuListData: dataUpdate})
    } else {
      const removing = listOfItems.filter(each => each !== id)
      this.setState({listOfItems: removing})
    }
  }

  successView = () => {
    const {menuListData, count, listOfItems} = this.state

    return (
      <cartContext.Provider
        value={{
          count,
          onDecrement: this.decrementCartItemQuantity,
          onIncrement: this.incrementCartItemQuantity,
          listOfItems,
        }}
      >
        <div>
          {menuListData.map(each => (
            <EachFoodItem food={each} key={each.id} />
          ))}
        </div>
      </cartContext.Provider>
    )
  }

  loaderView = () => (
    <div className="loaderView">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
      <h1>Page Not Found Try Again</h1>
      <button type="button" onClick={this.fetchApi}>
        Try Again
      </button>
    </div>
  )

  dataFetch = () => {
    const {statusData} = this.state

    switch (statusData) {
      case 'SUCCESS':
        return this.successView()
      case 'INPROGRESS':
        return this.loaderView()
      case 'FAILURE':
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {foodsData, count, tabs, tabName, listOfItems} = this.state
    console.log(tabName)

    return (
      <div>
        <NavBar data={foodsData} counter={count} listOfItems={listOfItems} />

        <ul className="Tabs">
          {tabs.map(each => (
            <li key={each.id}>
              <button
                className={each.name === tabName ? 'TabButton' : 'tabButton'}
                type="button"
                onClick={this.addSelectTab}
                value={each.name}
              >
                {each.name}
              </button>
            </li>
          ))}
        </ul>

        {this.dataFetch()}
      </div>
    )
  }
}

export default AllProducts
