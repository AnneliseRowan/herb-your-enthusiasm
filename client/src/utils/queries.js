import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
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
    }
  }
`;

export const QUERY_PLANT = gql`
 {
   query plants {
    plants {
      _id
      plantName
      plantLight
      plantWater
      petFriendly
      plantImage
      moreInfo
    }  
  }
 }
`;