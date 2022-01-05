import React from "react";
import { useQuery, gql } from "@apollo/client";


const GET_USESRS = gql`
  query {
        getUsers{
          name
          age
          college
        }
    }
`

function UserList(){
    const  {data, loading} = useQuery(GET_USESRS);
    

   console.log(data);
    if (loading) {
      return <p>Data is loading...</p>;
    }else{
        return <div className ="userlist">
            {/* <h2>hello</h2> */}
            {data.getUsers.map(user =>{
              return (
                <li key={user.id}>{user.name}</li>
              )
            })}
          </div>;
    }
}

export default UserList;