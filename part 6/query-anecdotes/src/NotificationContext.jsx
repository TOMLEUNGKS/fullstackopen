import { createContext, useReducer, useContext } from "react"

const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.data
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[1]
}

export const NotificationProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext