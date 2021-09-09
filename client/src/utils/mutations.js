import { gql } from '@apollo/client';

export const LOGIN_PROFILE = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const SAVE_PLANT = gql`
  mutation savePlant($plantData: PlantInput!) {
    savePlant(plantData: $plantData) {
      _id
      username
      email
      savedPlants {
        name
        water
        sun
        pets
      }
    }
  }
`;

export const REMOVE_PLANT = gql`mutation deletePlant($_id: String) {
  deletePlant(_id: $_id){
    _id
  }
}
`;

export const JON_PLANT = gql`
mutation saveUserPlant($userID: String, $plantNickName: String, $plantName: String,
  $plantLight: String,   $plantWater: String, $petFriendly: Boolean, 
  $plantImage: String, $moreInfo: String, $waterFrequency: String,
  $lastWater: String, $nextWater: String) {
    saveUserPlant(userID: $userID, plantNickName: $plantNickName, plantName: $plantName
    plantLight: $plantLight, plantWater: $plantWater, petFriendly: $petFriendly,
    plantImage: $plantImage, moreInfo: $moreInfo, waterFrequency: $waterFrequency,
    lastWater: $lastWater, nextWater: $nextWater) {
      userID
      _id
      plantName
    }
  }
`;

export const UPDATE_PLANT = gql`
mutation watered($_id: String, $lastWater: String, $nextWater: String, $waterFrequency: String ) {
  watered(_id: $_id, lastWater: $lastWater, nextWater: $nextWater, waterFrequency: $waterFrequency) {
    _id
    plantName
    lastWater
    nextWater
  }
}
`;