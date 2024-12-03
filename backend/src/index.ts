import {makeExecutableSchema} from '@graphql-tools/schema'
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from "@apollo/server/express4"
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import http from 'http'
import express from 'express'
import {applyMiddleware} from 'graphql-middleware'
import { $server } from '../config'


import models from './models/'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'


const app = express()
const httpServer = http.createServer(app)
const corsOptions = {
    origin : "*", 
    credentials : true 
}
app.use(express.json())
app.use(cors(corsOptions))
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
    next()
})


//Schema 
const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs, 
        resolvers
    })
)
//Apollo server 
const apolloServer = new ApolloServer({
    schema, 
    plugins : [ApolloServerPluginDrainHttpServer({httpServer})]
})

const main = async()=>{
    const alter = true 
    const force = true 
    await apolloServer.start()
    await models.sequelize.sync({alter,force})
    app.use('/graphql',cors<cors.CorsRequest>(), 
    expressMiddleware(apolloServer,{
        context : async ()=>({models})
    }))
    await new Promise<void>((resolve)=>httpServer.listen({
        port : $server.port
    },resolve))
    console.log(`🚀Server ready at http://localhost:${$server.port}`)
}
main()