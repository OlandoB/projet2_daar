import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import './css/App.css'

type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

export const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}

export const App = () => {
  const wallet = useWallet()

  const handleCreateCollection = async cardCount => {
    if (!wallet) {
      alert("Erreur : wallet n'est pas défini.")
      return
    }

    try {
      if (wallet.contract) {
        await wallet.contract.createCollection(
          'Nom de la collection',
          cardCount
        )
        alert("C'est bon")
      } else {
        alert("Erreur : wallet.contract n'est pas défini.")
      }
    } catch (error) {
      alert('Pas bon : Une erreur est survenue lors de la transaction.')
      console.error('Erreur de transaction :', error)
    } finally {
    }
  }

  return (
    <div className="body">
      <h1>Welcome to Pokémon TCG</h1>
    </div>
  )
}
