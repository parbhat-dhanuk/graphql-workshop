import {Sequelize} from 'sequelize'
import { $db } from '../../config'
import {IModels} from '../types'
console.log($db.connectionString)
const sequelize = new Sequelize($db.connectionString)
const models:IModels = {
    User : require('./User').default(sequelize,Sequelize), 
    sequelize
}
export default models