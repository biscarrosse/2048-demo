// import { GET_DATA } from "../../index";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
// } from "@apollo/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // GraphQL example:
  //
  // const { loading, error, data } = useQuery(GET_DATA);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
  // return data.locations.map(({ id, name photo }) => (
  //   <div key={id}>
  //     <h1>{name}</h1>
  //     <img width="400" height="250" alt="location-reference" src={`${photo}`} />
  //   </div>
  // ));

  return (
    <div className="wrap">
      <h1>2048</h1>
      {children}
    </div>
  );
};

export default Layout;
