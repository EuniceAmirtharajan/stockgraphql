const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const addProduct = require('./resolvers/create');
const deleteProduct = require('./resolvers/remove');
const getAllProducts = require('./resolvers/list');
const getOneProduct = require('./resolvers/view');

const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        addedAt: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            listProducts: {
                type: new GraphQLList(productType),
                resolve: (parent, args) =>getAllProducts()
            },
            viewProduct: {
                args: {
                    id: {type:new GraphQLNonNull(GraphQLString)}
                },
                type: productType,
                resolve: (parent, args) => getOneProduct(args.id)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createProduct: {
                type: productType,
                args: {
                    name: {type:new GraphQLNonNull(GraphQLString)},
                    quantity: {type:new GraphQLNonNull(GraphQLInt)}
                },
                resolve: (parent, args) => addProduct(args)
            },
            removeProduct: {
                type: GraphQLString,
                args: {
                    id: {type:new GraphQLNonNull(GraphQLString)}
                },
                resolve: (parent, args) => deleteProduct(args.id)
            }
        }
    })

});
module.exports = schema;