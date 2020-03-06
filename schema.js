const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull
} = require('graphql');

// Dummy data
const peoples = [
    {id: '1', nama: 'Yusuf Rizal', email: 'yrizal@email', usia: 28}, 
    {id: '2', nama: 'Farah Diba', email: 'fdiba@email', usia: 30}, 
    {id: '3', nama: 'Benazir Shea', email: 'bshea@email', usia: 1}, 
]; 

// Peoples Type
const PeoplesType = new GraphQLObjectType({
    name: 'peoples', 
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
        people: {
            type: PeoplesType, 
            args: {
                id: {type: GraphQLString}
            }, 
            resolve(parentValue, args) {
                for(let i = 0; i < peoples.length; i++) {
                    if(peoples[i].id == args.id) {
                        return peoples[i]; 
                    }
                }
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});