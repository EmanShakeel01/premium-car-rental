import { createContext, useContext, useState } from 'react'

const CompareContext = createContext()
const MAX_COMPARE = 3

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  const addToCompare = (car) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) return prev
      if (prev.length >= MAX_COMPARE) {
        alert(`You can compare up to ${MAX_COMPARE} cars at a time.`)
        return prev
      }
      return [...prev, car]
    })
  }

  const removeFromCompare = (carId) => {
    setCompareList(prev => prev.filter(c => c.id !== carId))
  }

  const isInCompare = (carId) => compareList.some(c => c.id === carId)

  const clearCompare = () => setCompareList([])

  const toggleCompare = (car) => {
    isInCompare(car.id) ? removeFromCompare(car.id) : addToCompare(car)
  }

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}