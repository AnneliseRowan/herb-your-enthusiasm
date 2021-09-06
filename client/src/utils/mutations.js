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

export const REMOVE_PLANT = gql`
  mutation removePlant($plantId: ID!) {
    removePlant(plantId: $plantId) {
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

export const JON_PLANT = gql`
  mutation saveUserPlant($userID: String, $plantNickName: String, $plantName: String, $plantLight: String, $plantWater: String, $petFriendly: Boolean, $plantImage: String, $moreInfo: String){
  saveUserPlant(userID: $userID, plantNickName: $plantNickName, plantName: $plantName, plantLight:$plantLight, plantWater: $plantWater, petFriendly: $petFriendly, plantImage: $plantImage, moreInfo: $moreInfo) {
   	userID
    plantNickName
    plantName
    plantLight
    plantWater
    petFriendly
    plantImage
    moreInfo
  }
}
`;