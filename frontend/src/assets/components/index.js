import React from 'react'

export const Container = ({ children }) => (
  <div className='container'>
    { children }
  </div>
)

export const Row = ({ children }) => (
  <div className='row'>
    { children }
  </div>
)

export const Col = ({ className, id, style, children }) => (
  <div className={className} id={id} style={style}>
    {children}
  </div>
)

export const Form = ({handleLogin, action, method, children }) => (
  <form action={action} method={method} onSubmit={handleLogin}>
    { children }
  </form>
)
