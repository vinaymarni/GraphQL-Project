const express = require('express');
const { buildSchema} = require('graphql');
const { graphqlHTTP} = require('express-graphql');
const cors = require("cors"); 

const app = express()

const schema = buildSchema(`

    type User {
        name: String
        age: Int
        college: String
    }


    type Query {
        hello: String
        welcomeMessage(name: String!): String
        getUser: User
        getUsers: [User]
    }
`)


// resolvers that are implemented
const root ={
    hello: () =>{
        return 'hello world';
    },
    welcomeMessage: (args) =>{
        //checking whats in args
        //console.log(args);
        return `hey hello ${args.name}`;
    },
    getUser: () =>{
        const user = {
            name: 'sai',
            age : 25,
            college: 'NMREC'
        };
        return user;
    },
    getUsers:() =>{
        const users = [
            {
                name: 'sai',
                age : 25,
                college: 'NMREC'
            },
            {
                name: 'santhosh',
                age : 24,
                college: 'NMREC'
            }
        ];
        return  users;
    }
}


app.use(
    cors({
      optionsSuccessStatus: 200, //option sucess status
      origin: "http://localhost:3001", //origin allowed to access the server
    })
  );

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema : schema,
    rootValue: root,
}))


app.listen(4000, () => console.log(`server on port 4000`))  