import { useEffect } from "react"

const Notification = (
    {showAddNotice, setAddNotice,
    showChangeNotice, setChangeNotice, 
    noticeName, setNoticeName,
    showErrorNotice, setErrorNotice
    }) => {
    useEffect(() => {
        if (showAddNotice) {
            const timer = setTimeout(() => {
                setAddNotice(false)
                setNoticeName('')
            }, 3000)
            return () => clearTimeout(timer)
        }
        if (showChangeNotice) {
            const timer = setTimeout(() => {
                setChangeNotice(false)
                setNoticeName('')
            }, 3000)
            return () => clearTimeout(timer)
        }
        if (showErrorNotice) {
            const timer = setTimeout(() => {
                setErrorNotice(false)
                setNoticeName('')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showAddNotice, setAddNotice, 
        setNoticeName, 
        showChangeNotice, setChangeNotice,
        showErrorNotice, setErrorNotice
    ])
    
    if (showAddNotice) {
        return (
            <div className="notice">
              {`Added ${noticeName}`}
            </div>
        )
    }
    if (showChangeNotice) {
        return (
            <div className="notice">
              {`The number of ${noticeName} is changed`}
            </div>
        )
    }
    if (showErrorNotice) {
        return (
            <div className="error">
              {`Information of ${noticeName} has already been removed from server`}
            </div>
        )
    }
    return null
}

  export default Notification