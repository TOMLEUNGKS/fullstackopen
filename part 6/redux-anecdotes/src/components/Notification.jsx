import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // useEffect(() => {
  //   if (notification) {
  //     dispatch(notify())
  //   }
  // }, [notification, dispatch])

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification