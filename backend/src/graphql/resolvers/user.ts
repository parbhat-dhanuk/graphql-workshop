import {doLogin,getUserBy} from '../../lib/auth'
import {getUserData} from '../../lib/jwt'
import { ICreateUserInput, ILoginInput, IModels, IToken, IUser } from '../../types'


export default {
    Query : {
        getUsers : (_:any,args:any,ctx:{models:IModels}):IUser[]=>ctx.models.User.findAll(), 
        getUser : async(_:any,{at}:{at:string},{models}:{models:IModels}):Promise<any>=>{
            const connectedUser = await getUserData(at)
            if(connectedUser){
                const user = await getUserBy({
                    id : connectedUser.id, 
                    email : connectedUser.email, 
                    active : connectedUser.active
                },models)
                if(user){
                    return connectedUser
                }
            }
            return {
                id : "", 
                username : "", 
                password : "", 
                email : "", 
                role : "", 
                active : false
            }
        }
    }, 
    Mutation : {
        createUser : (_:any,{input}:{input:ICreateUserInput},{models}:{models:IModels}):IUser=>models.User.create({...input}), 
        login : (_:any,{input}:{input:ILoginInput},{models}:{models:IModels}):Promise<IToken>=>doLogin(input.email,input.password,models)
    }
}