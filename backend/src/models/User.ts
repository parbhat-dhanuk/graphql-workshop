import {encrypt} from '@contentpi/lib'
import { IDatatypes, IUser } from '../types'

export default(sequelize:any,Datatypes:IDatatypes) : IUser =>{
    const User = sequelize.define('User',{
        id : {
            primaryKey : true, 
            allowNull : false, 
            type : Datatypes.UUID, 
            defaultValue : Datatypes.UUIDV4()
        }, 
        username : {
            type : Datatypes.STRING, 
            allowNull : false, 
            unique : true, 
            validate : {
                isAlphanumeric : {
                    args : true, 
                    msg : "The user just accepts alphanumeric characters"
                },
                len : {
                    args : [4,20], 
                    msg : "The username must be from 4 to 20 characters"
                }
            }, 
        }, 
        password : {
            type : Datatypes.STRING, 
            allowNull : false
        }, 
        email : {
            type : Datatypes.STRING, 
            allowNull : false, 
            unique : true, 
            validate : {
                isEmail : {
                    args : true, 
                    msg : 'Invalid email'
                }
            }
        }, 
        role : {
            type : Datatypes.STRING, 
            allowNull : false, 
            defaultValue : 'user'
        }, 
        active : {
            type : Datatypes.BOOLEAN, 
            allowNull : false, 
            defaultValue : false 
        }
    }, 
    {
        hooks : {
            beforeCreate : (user:IUser):void=>{
                user.password = encrypt(user.password)
            }
        }
    })
    return User
}