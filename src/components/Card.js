import React, { Component } from 'react'
import clientListContract from '../../build/contracts/ClientList.json'
import getWeb3 from '../utils/getWeb3'
import {Card, CardTitle} from 'react-materialize'


// import '../css/open-sans.css'
// import '../css/pure-min.css'
// import '../App.css'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const clientList = contract(clientListContract)
    clientList.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on clientList.
    var clientListInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      clientList.deployed().then((instance) => {
        clientListInstance = instance

      //   // Stores a given value, 5 by default.
      //   return clientListInstance.set(5, {from: accounts[0]})
      // }).then((result) => {
      //   // Get the value from the contract to prove it worked.
      //   return clientListInstance.get.call(accounts[0])
      // }).then((result) => {
      //   // Update state with the result.
      //   return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <Card className='small'
      	header={<CardTitle image='./Kitten.jpg'>Buy this thing!</CardTitle>}
      	actions={[<a href='#'>Add to Cart</a>]}>
      	I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively.
      </Card>
    );
  }
}

export default Item
