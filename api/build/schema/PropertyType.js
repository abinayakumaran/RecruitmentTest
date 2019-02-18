"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PropertyType = void 0;

var _graphql = require("graphql");
var _graphqlIsoDate = require("graphql-iso-date");

var _graphqlRelay = require("graphql-relay");
var _node = require("./node");

const PropertyType = new _graphql.GraphQLObjectType({
  name: 'Property',
  interfaces: () => [_node.nodeInterface],
  fields: () => ({
    id: (0, _graphqlRelay.globalIdField)(),

    numberOfRooms: {
      type: _graphql.GraphQLFloat,
      resolve: parent => parent.number_of_rooms },


    livingSurface: {
      type: _graphql.GraphQLFloat,
      resolve: parent => parent.living_surface },


    landSurface: {
      type: _graphql.GraphQLFloat,
      resolve: parent => parent.land_surface },


    numberOfParkings: {
      type: _graphql.GraphQLInt,
      resolve: parent => parent.number_of_parkings },


    createdAt: {
      type: _graphqlIsoDate.GraphQLDateTime,
      resolve: parent => parent.created_at },


    updatedAt: {
      type: _graphqlIsoDate.GraphQLDateTime,
      resolve: parent => parent.updated_at } }) });exports.PropertyType = PropertyType;
//# sourceMappingURL=PropertyType.js.map
