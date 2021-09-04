import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { SAVE_PLANT } from '../utils/mutations';
import { QUERY_PLANT } from '../utils/queries';
import { savePlantIds, getSavedPlantIds } from '../utils/localStorage';

import Auth from '../utils/auth';

import './style.css'
import plant from './plantData'; 

const SearchPlants = () => {
  const { loading, data } = useQuery(QUERY_PLANT); 

  if (loading) {
    // return <h2>LOADING...</h2>;
  } else {
    console.log('dataaaa', data)
  }
  
    const userData = data?.plants || []; 

    // console.log('userDataaa', userData); 
  


  // console.log('plant', data.plant.map((pl) => (
  //   <li key={pl.id}>{pl.plantName}</li>
  // )))
  
  const [searchedPlants, setSearchedPlants] = useState([]);

  const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());

  const [savePlant, { error }] = useMutation(SAVE_PLANT);

  useEffect(() => {
    return () => savePlantIds(savedPlantIds);
  });

  const checkTrue = (thing) => {
    if(thing) {
      return `Yes`
    } else
    return `No`
  }

  // create function to handle saving a plant to our user
  const handleSavePlant = async (plantId) => {
    // find the plant in `searchedPlants` state by the matching id
    const plantToSave = searchedPlants.find((plant) => plant.plantId === plantId);


    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePlant({
        variables: { plantData: { ...plantToSave } },
      });
      console.log('savedPlantIds', savedPlantIds);
      setSavedPlantIds([...savedPlantIds, plantToSave.plantId]);
      console.log(data, 'data line 70')
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return ( 
    <>
      <Jumbotron fluid className="text-dark bg-light">
        <Container>
          <h1 style={{textAlign: "center", fontFamily: 'Oleo Script, cursive', fontSize: "64px"}}>Our Beautiful Plant Page</h1>
        </Container>
      </Jumbotron>
        <Container >
      {data.plants.map((plants, i) => (
        <CardColumns>
              <Card key={plants._id} border="dark">
                {plants.plantImage ? (
                  <Card.Img
                  src={plants.plantImage}
                  alt={`The cover for ${plants.plantName}`}
                  variant="top"
                  />
                  ) : null}
                <Card.Body>
                  <Card.Title>{plants.plantName}</Card.Title>
                  <p className="small">Sun: {plants.plantLight}</p>
                  <p className="small">Water: {plants.plantWater}</p>
                  <p className="small">Pet-Friendly: {checkTrue(plants.petFriendly)}</p>
                  <Card.Text>{plants.plantLight}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                    disabled={savedPlantIds?.some(
                      (savedId) => savedId === plant.plantId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePlant(plant.plantId)}
                      >
                      {savedPlantIds?.some((savedId) => savedId === plant.plantId)
                        ? 'Plant Already Saved!'
                        : 'Save This Plant!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
        </CardColumns>
                        ))}
      </Container>
    </>
  );
};

export default SearchPlants;
