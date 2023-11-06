import React, { Component } from 'react'
import './css/Booster.css'
import Collection from './Collection'
class Booster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: false,
    }
  }

  // Handler pour la fonction "booster"
  handleBooster = async i => {
    const { wallet } = this.props
    if (!wallet) {
      alert("Erreur : wallet n'est pas défini.")
      return
    }
    try {
      this.setState({ creatingBooster: true })

      if (wallet.contract) {
        await wallet.contract.booster(i)
      } else {
        alert("Erreur : wallet.contract n'est pas défini.")
      }
    } catch (error) {
      alert('Error')
      console.error('Erreur de transaction :', error)
    }
  }

  handleSingle = async i => {
    const { wallet } = this.props
    if (!wallet) {
      alert("Erreur : wallet n'est pas défini.")
      return
    }
    try {
      if (wallet.contract) {
        await wallet.contract.single(i)
      } else {
        alert("Erreur : wallet.contract n'est pas défini.")
      }
    } catch (error) {
      alert('Errror')
      console.error('Erreur de transaction :', error)
    }
  }
  handleCollection = async () => {
    this.setState({ collection: true })
  }

  render() {
    const tirage1Price = 160
    const tirage10Price = 1600

    return (
      <div className="booster-container">
        <div className="banner-container">
          <button className="permanent-banner-button">
            Bannière permanente
          </button>
          <div className="banner-image" />
        </div>
        <div className="tirage-buttons">
          <button
            className="tirage-button"
            onClick={() => this.handleSingle(1)}
          >
            1 tirage {tirage1Price} eth
          </button>
          <button
            className="tirage-button"
            onClick={() => this.handleBooster(1)}
          >
            10 tirages {tirage10Price} eth
          </button>
          <button
            className="tirage-button"
            onClick={() => this.handleBooster(1)}
          >
            collection
          </button>
        </div>
      </div>
    )
  }
}

export default Booster
