import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom'
import api from '../../services/api'
import { Container, Row, Col} from '../../assets/components'
import { logout } from '../../services/auth'

class UsuarioPage extends Component {
  state = {
    title: '',
    tarefas: []
  }

  componentDidMount() {
    this.getTarefas()
  }

  getTarefas = () => {
    api.get('/tasks')
    .then(response => {
      this.setState({ tarefas: response.data})
    })
    .catch(err => {
      console.log("ERROR: ", err)
    })
  }

  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  completarTarefa = (id) => {
    api.put('/tasks/' + id, { completed: true })
      .then(response => {
        if (response.status === 200) {
          this.getTarefas()
        }
      })
      .catch(err => {
        console.log("ERROR: ", err)
      })
  }

  deletarTarefa = (id) => {
    api.delete('/tasks/' + id)
      .then(response => {
        if (response.status === 204) {
          this.getTarefas()
        }
      })
      .catch(err => {
        console.log("ERROR: ", err)
      })
  }

  showTarefas = () => {
    let linhas = []

    for (let i = 0; i < this.state.tarefas.length; i ++) {
      linhas.push(
      <tr key={this.state.tarefas[i].id}>
        {this.state.tarefas[i].completed ?
          <td style={{textDecoration: 'line-through'}}>{this.state.tarefas[i].title}</td> :
          <td>{this.state.tarefas[i].title}</td> 
        }  
        <td className="action">
        {!this.state.tarefas[i].completed && 
        <button onClick={this.completarTarefa.bind(this, this.state.tarefas[i].id)}>
            <i className="material-icons done">
              done
            </i>  
          </button>
        }
          <button onClick={this.deletarTarefa.bind(this, this.state.tarefas[i].id)}>
            <i className="material-icons delete">
              delete_outline
            </i>  
          </button>
        </td>
      </tr>
      )
      return linhas
    }
  }

  render () {
    return (
      <div>
        <Container>
          <Row>
            <Col className="col-9 md-9 push-md-1">
              <div className="title-page">
                <h1>Olá, Fulano de Tal</h1>
              </div>
              <hr align='left' />
            </Col>
            <Col className="col-3 md-1">
              <div className="pos-back">
                <Link to="/" onClick={this.handleLogout} title="Fazer logout">
                  <i className="material-icons">
                    exit_to_app
                  </i>
                </Link>
              </div>
            </Col>
            
            <Col className="col-12 md-8 push-md-1">
              <div className="form-group t-primary">
                <label htmlFor="ForAddOrSearch">Adicione ou pesquise por tarefas abaixo</label>
                <input type="text" name="addOrSearch" id="addOrSearch" placeholder="Adicione ou pesquise por tarefas" />
              </div>
            </Col>
            <Col className="col-12 md-3" id="lado-a-lado">
              <button className="btn-square-success" style={{marginLeft: '4px'}}>
                <i className="material-icons">
                  add
                </i>
              </button>
              <button className="btn-square-info" style={{marginLeft: '4px'}}>
                <i className="material-icons">
                  search
                </i>
              </button>
              <button className="btn-square-danger" style={{marginLeft: '4px'}}>
                <i className="material-icons">
                    close
                </i>
              </button>
            </Col>
            <Col className="col-12 md-10 push-md-1" style={{marginTop: '96px', marginBottom: '96px'}}>
              <h2 className="t-primary">Tarefas</h2>
              {!this.state.tarefas.length && <p className="t-primary center" style={{marginTop: '100px'}}>Você não possui nenhuma tarefa</p>} 
              <table>
                <tbody>
                  {this.showTarefas()}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
        <div className='bg-wave' style={{marginTop: '20px'}} />
      </div>
    )
  } 
}

export default withRouter(UsuarioPage)