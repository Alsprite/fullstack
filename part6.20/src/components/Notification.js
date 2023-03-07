import { useContext, useEffect } from 'react'
import messageContext from '../Context'

const Notification = () => {
  
  const [message, dispatch] = useContext(messageContext)

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [message, dispatch])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default Notification
