import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

const SideDrawer = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      classNames='slide-in-left'
      in={show}
      timeout={200}
      mountOnEnter
      unmountOnExit>
      <aside className='side-drawer' onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  )
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer
