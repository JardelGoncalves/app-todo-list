import chai from 'chai'
import td from 'testdouble'
import app from '../../src/app'

global.app = app
global.expect = chai.expect
global.td = td
