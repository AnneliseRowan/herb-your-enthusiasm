import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPlants {
        name
        water
        sun
        pets
      }
    }}
  
`;

export const QUERY_PLANT = gql`
    query plants {
    
    plants {
      _id
      plantName
      plantLight
      plantWater
      petFriendly
      plantImage
      moreInfo
      waterFrequency
    } 
     }
  
`;

export const QUERY_USER_PLANT = gql`
query userplants {
  
  userplants{
    _id
    userID
    plantNickName
    plantName
    plantLight
    plantWater
    petFriendly
    plantImage
    moreInfo
    waterFrequency
    lastWater
    nextWater
  } 
   }
   `;