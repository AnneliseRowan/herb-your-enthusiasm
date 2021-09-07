import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Row,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { SAVE_PLANT } from '../utils/mutations';
import { QUERY_PLANT } from '../utils/queries';
import { savePlantIds, getSavedPlantIds } from '../utils/localStorage';

import Auth from '../utils/auth';

import './Style.css'
import plant from './plantData'; 

const SearchPlants = () => {
  const { loading, data } = useQuery(QUERY_PLANT); 
  
  const userData = data?.plants || []; 
    
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
      <Jumbotron fluid className="text-dark bg-light" style={{marginTop:"45px"}}>
        <Container>
          <h1 style={{textAlign: "center", fontFamily: 'Oleo Script, cursive', fontSize: "72px"}}>Our Beautiful Plant Page</h1>
        </Container>
      </Jumbotron>
        <Row xs={1} md={2} lg={4} style={{}}>
          {data.plants.map((plants, i) => (
            <Col>
              <Card key={plants._id} border="light" style={{width: "24rem", margin:"10px"}} id="cardSizing">
                {plants.plantImage ? (
                  <Card.Img style={{height:"36rem"}}
                  src={plants.plantImage}
                  alt={`The cover for ${plants.plantName}`}
                  variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title style={{fontFamily: 'Oleo Script, cursive', fontSize:"32px", textAlign:"center"}}>{plants.plantName}</Card.Title>
                  <p className="medium">Sun: {plants.plantLight}</p>
                  <p className="medium">Water: {plants.plantWater}</p>
                  <p className="medium">Pet-Friendly: {checkTrue(plants.petFriendly)}</p>
                  {/* <Card.Text>{plants.plantLight}</Card.Text> */}
                  {Auth.loggedIn() && (
                    <Button
                    disabled={savedPlantIds?.some(
                      (savedId) => savedId === plant.plantId
                      )}
                      className="btn-block btn-light" 
                      onClick={() => handleSavePlant(plant.plantId)}
                      >
                      {savedPlantIds?.some((savedId) => savedId === plant.plantId)
                        ? "It's ok he's already adopted"
                        : 'Adopt this plant🌱'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default SearchPlants;