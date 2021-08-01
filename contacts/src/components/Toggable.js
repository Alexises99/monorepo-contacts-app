import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Toggable = forwardRef(({ children, buttonlabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <button
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        {buttonlabel}
      </button>
      <div style={showWhenVisible}>
        {children}
      </div>
      <div>
        <button
          style={showWhenVisible}
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>

    </div>
  )
})

export default Toggable
