import dotenv from 'dotenv'
import config from './config.json'
dotenv.config() 

type Db = {
    connectionString : string
}
type Security  = {
    secretKey : string, 
    expiresIn : string
}
type Server = {
    port : number
}

const db : Db = {
    connectionString : process.env.DB_CONN_STRING || "",
}
const {security,server} = config
export const $db:Db = db 
export const $security:Security = security 
export const $server:Server = server 
