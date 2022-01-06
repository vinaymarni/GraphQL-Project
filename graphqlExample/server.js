const express = require('express');
const { buildSchema} = require('graphql');
const { graphqlHTTP} = require('express-graphql');
const axios = require("axios");
const cors = require("cors"); 

const app = express()

const schema = buildSchema(`
    type Post{
        userId : ID
        id: Int
        title: String
        body: String
    }

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
        getPostsFromExtrenelAPI: [Post]
    }
    input UserInput{
        name: String! 
        age: Int!
        college: String!
    }

`);


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
                name: 'Vinay',
                age : 25,
                college: 'VSM'
            },
            {
                name: 'Kumar',
                age : 24,
                college: 'NMREC'
            }
        ];
        return  users;
    },
    getPostsFromExtrenelAPI: async() =>{
        const result = await axios
       .get("https://jsonplaceholder.typicode.com/posts")
       return result.data;
    },
    setMessage: ({newMessage}) =>{
        message = newMessage;
        return message;
    },
    message: () => message,

    createUser: (args) =>{
        // Creating user
        console.log(args)
        return args.user;
    }

}


app.use(
    cors({
      optionsSuccessStatus: 200, //option sucess status
      origin: "http://localhost:3000", //origin allowed to access the server
    })
  );

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema : schema,
    rootValue: root,
}))


app.listen(4000, () => console.log(`server on port 4000`))  