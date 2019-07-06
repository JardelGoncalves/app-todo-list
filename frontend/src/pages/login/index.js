import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import api from '../../services/api'
import { login } from '../../services/auth'

import { Container, Row, Col, Form} from '../../assets/components'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  handleLogin = e => {
    e.preventDefault()
    const { email, password } = this.state
    if (!email.trim() || !password {
      this.setState({ error: 'Todos os campos são obrigatórios' })
    } else {
      api.post('/session', { email, password })
        .then(response => {
          login(response.data.token)
          this.props.history.push('/app')
        })
        .catch(err => {
          this.setState({ error: err.response.data.error })
        })
    }
  }

  render () {
    return (
      <div>
        <Container>
          <Row>
            <Col className='col-12 sm-10 push-sm-1 md-8 push-md-2'>
              <div className="title-page center">
                <h1>Bem-vindo de volta</h1>
              </div>
              {this.state.error &&<div className='alert error'><i className="material-icons">error</i>{this.state.error}</div>}
              <Form handleLogin={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="forEmail">Email</label>
                  <input type='text' name='email' id='email' placeholder='Informe seu email'
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="forPassword">Password</label>
                  <input type="password" name="password" id="password" placeholder="Informe sua senha"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
                <div className="center">
                  <button type='submit' className="btn-primary">Login</button>
                </div>
              </Form>
              <div className="center" style={{marginTop: '64px'}}>
                <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se agora!</Link></p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="bg-wave" />
      </div>
    )
  }
}

export default withRouter(LoginPage)