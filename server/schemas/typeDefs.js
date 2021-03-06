const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
  }  
  type Auth {
    token: ID!
    profile: Profile
  }
  
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile    
    me: Profile
    plants: [Plant]!
    userplants(userID: String): [Userplant]! 
  }
  type Plant {
    _id: ID
    plantName: String
    plantLight: String
    plantWater: String
    petFriendly: Boolean
    plantImage: String
    moreInfo: String
    waterFrequency: String
  }
  type Userplant {
    _id: ID
    userID: String
    plantNickName: String
    plantName: String
    plantLight: String
    plantWater: String
    petFriendly: Boolean
    plantImage: String
    moreInfo: String
    waterFrequency: String
    lastWater: String
    nextWater: String

  }
  type Mutation {
    saveUserPlant(userID: String, plantNickName: String, plantName: String,
    plantLight: String, plantWater: String, petFriendly: Boolean, plantImage: String,
     moreInfo: String, waterFrequency: String, lastWater: String, nextWater: String): Userplant
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    watered(_id: String, lastWater: String, nextWater: String, waterFrequency: String): Userplant 
    deletePlant(_id: String): Userplant  
  }
`;

// const typeDefs = gql`
//   type Profile {
//     _id: ID
//     username: String
//     email: String
//     password: String
//     # skills: [String]!
//   }
//   type Auth {
//     token: ID!
//     profile: Profile
//   }
//   type Query {
//     profiles: [Profile]!
//     profile(profileId: ID!): Profile
//     # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
//     me: Profile
//   }
//   type Mutation {
//     addProfile(name: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     # addSkill(profileId: ID!, skill: String!): Profile
//     removeProfile: Profile
//     # removeSkill(skill: String!): Profile
//   }
// `;

module.exports = typeDefs;