function StarSelector({ rating, change }) {

    const starSelect = (num) => {
        if (rating >= num) {
            return "★"
        } else {
            return "☆"
        }
    }

    const starToggle = (num) => {
        change(num)
    }

  return (
    <>
            <div onClick={() => starToggle(1)}>{starSelect(1)}</div>
            <div onClick={() => starToggle(2)}>{starSelect(2)}</div>
            <div onClick={() => starToggle(3)}>{starSelect(3)}</div>
            <div onClick={() => starToggle(4)}>{starSelect(4)}</div>
            <div onClick={() => starToggle(5)}>{starSelect(5)}</div>
    </>
  )
}

export default StarSelector