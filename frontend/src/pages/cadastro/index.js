import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import api from "../../services/api"


import { Container, Row, Col, Form} from '../../assets/components'

class CadastroPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  }

  handleCadastro = e => {
    e.preventDefault()
    const { name, email, password } = this.state
    if (!name || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" })
    } else {
        api.post("/users", { name, email, password })
          .then(response => {
            this.setState({ success: true})
            this.setState({ error: '' })
          })
          .catch(err => {
            this.setState({ error: err.response.data.error })
            this.setState({ success: false})
          })
    }
  }

  handleErrorMessage = (messages) => {
    let arrayMessage = []
    if (typeof messages === 'object') {
      Object.keys(messages).map(key => {
        for (let i = 0; i < messages[key].length; i++) {
          const prepareMessage = <li>{messages[key][i]}</li>
          arrayMessage.push(prepareMessage)
        }
      })
    } else {
      arrayMessage.push(messages)
    }
    return arrayMessage
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="col-12 sm-2 md-2">
              <div className="pos-back">
                <Link to="/" title="Voltar para a página de login">
                  <i className="material-icons">
                    keyboard_backspace
                  </i>
                </Link>
              </div>
            </Col>
            <Col className='col-12 sm-8 md-8'>
              <div className="title-page center">
                <h1>Crie uma conta agora</h1>
              </div>

              {this.state.error && <div className='alert error'><ul>{this.handleErrorMessage(this.state.error)}</ul> </div>}

              {this.state.success &&
              <div className='alert success'>Cadastro realizado com sucesso! <Link to='/'><strong>Clique aqui</strong></Link> e faça login</div>}
              
              <Form handleLogin={this.handleCadastro}>
                <div className="form-group">
                  <label htmlFor="forName">Name</label>
                  <input type='text' name='name' id='name' placeholder='Informe seu nome'
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="forEmail">Email</label>
                  <input type='text' name='email' id='email' placeholder='Informe um email válido'
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="forPassword">Password</label>
                  <input type="password" name="password" id="password" placeholder="Informe uma senha"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
                <div className="center">
                  <button type='submit' className="btn-primary">Finalizar</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="bg-wave" style={{marginTop: '50px'}} />
      </div>
    )
  }
}

export default withRouter(CadastroPage)