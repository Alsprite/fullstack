const Notification = (props) => {
    if (props.message === null) {
      return null
    }
    return (
      <div className="error">
        {props.message}
      </div>
    )
  }

export default Notification