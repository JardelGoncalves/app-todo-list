import React, { Component } from 'react'

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

export const Col = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export const Form = ({handleLogin, action, method, children }) => (
  <form action={action} method={method} onSubmit={handleLogin}>
    { children }
  </form>
)
