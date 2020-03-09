const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull
} = require('graphql');

const axios = require('axios');

/*
// Dummy data
const peoples = [
    {id: '1', nama: 'Yusuf Rizal', email: 'yrizal@email', usia: 28}, 
    {id: '2', nama: 'Farah Diba', email: 'fdiba@email', usia: 30}, 
    {id: '3', nama: 'Benazir Shea', email: 'bshea@email', usia: 1}, 
]; */  

// Peoples Type
const PeoplesType = new GraphQLObjectType({
    name: 'Peoples', 
    fields: () => ({
        id: {type: GraphQLString}, 
        nama: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        usia: {type: GraphQLInt}, 
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        People: {
            type: PeoplesType, 
            args: {
                id: {type: GraphQLString}
            }, 
            resolve(parentValue, args) {
                /*
                for(let i = 0; i < peoples.length; i++) {
                    if(peoples[i].id == args.id) {
                        return peoples[i]; 
                    }
                }*/ 
                return axios.get('http://localhost:3000/peoples/'+args.id)
                    .then(res => res.data);
            }
        }, 
        Peoples: {
            type: new GraphQLList(PeoplesType), 
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/peoples')
                    .then(res => res.data);
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});