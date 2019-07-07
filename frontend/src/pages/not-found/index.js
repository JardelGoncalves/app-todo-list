import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Row, Col } from '../../assets/components'

import ilustracaoError from '../../assets/img/404.svg'

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className='sm-12 md-8 push-md-2' style={{ marginTop: '60px' }}>
              <div className='center'>
                <img src={ilustracaoError} width='650' />
                <h1 className='t-primary'>Página não encontrada</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <div className='bg-wave' />
      </div>
    )
  }
}

export default withRouter(PageNotFound)