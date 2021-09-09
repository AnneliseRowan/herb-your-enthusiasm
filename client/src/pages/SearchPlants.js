import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Row,
  Collapse
} from 'react-bootstrap';
import {Helmet} from 'react-helmet';


import { gql, useQuery, useMutation } from '@apollo/client';
//import { useMutation } from '@apollo/client';
import { SAVE_PLANT, JON_PLANT } from '../utils/mutations';
import { QUERY_PLANT, QUERY_USER_PLANT } from '../utils/queries';
import { savePlantIds, getSavedPlantIds } from '../utils/localStorage';

import Auth from '../utils/auth';

import './Style.css'
import plant from './plantData'; 

const SearchPlants = () => {
  console.log('render search plants')
  const { loading, data } = useQuery(QUERY_PLANT); 
    
  const [searchedPlants, setSearchedPlants] = useState([]);

  const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());

  const [savePlant, { error }] = useMutation(SAVE_PLANT);

  // const [open, setOpen] = React.useState(false, -1);

  const [expandedId, setExpandedId] = React.useState(false, -1);

  useEffect(() => {
    return () => savePlantIds(savedPlantIds);
  });

  const checkTrue = (thing) => {
    if(thing) {
      return `Yes`
    } else
    return `No`
  }


  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };


  const [jonSavePlant, { data: savePlantData }] = useMutation(JON_PLANT)
  const user = Auth.getProfile()

  console.log('userrrr? ', user)


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
      setSavedPlantIds([...savedPlantIds, plantToSave.plantId]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return ( 
    <>

      <Helmet>
        <style>{'body { background:linear-gradient(rgba(250,0,0,0.5),transparent); background-color: green; }'}</style>
      </Helmet>
      <Jumbotron fluid className="text-dark bg-light" style={{marginTop:"45px", border:'solid'}}>

        <Container>
          <h1 style={{textAlign: "center", fontFamily: 'Oleo Script, cursive', color: 'green', fontSize: "72px"}}>Our Beautiful Plant Page</h1>
        </Container>
      </Jumbotron>
        <Row xs={1} md={2} lg={4}>
          {data.plants.map((plants, i) => (

            <Col>
              <Card key={plants._id} className="bg-warning" border="solid purple" style={{width: "16rem", margin:"10px"}} id="cardSizing">

                {plants.plantImage ? (
                  <Card.Img style={{height:"14rem"}} className="border-bottom border-dark"
                  src={plants.plantImage}
                  alt={`The cover for ${plants.plantName}`}
                  variant="top"
                  />
                ) : null}
                <Card.Body>

                  <Card.Title style={{fontFamily: 'Oleo Script, cursive', fontSize:"22px", textAlign:"center"}}>{plants.plantName}</Card.Title>
                  <Button size="sm"
                    onClick={() => handleExpandClick(i)}
                    aria-controls="plantInfo"
                    aria-expanded={expandedId === i}
                  >
                      Info
                  </Button>
                  <Collapse in={expandedId === i}>
                    <div id="plantInfo">
                      <p className="medium"><b>Sun</b>: {plants.plantLight}</p>
                      <p className="medium"><b>Water</b>: {plants.plantWater}</p>
                      <p className="medium"><b>Pet-Friendly</b>: {checkTrue(plants.petFriendly)}</p>
                    </div>
                  </Collapse>
                  {/* <Card.Text>{plants.plantLight}</Card.Text> */}
                  {Auth.loggedIn() && (
                    <Row>
                      <div class='text-center'>
                        <Button size="sm"
                        disabled={savedPlantIds?.some(
                          (savedId) => savedId === plant.plantId
                          )}
                          className="btn-block btn-light" 
                          onClick={() => jonSavePlant( { variables: {userID: user.data._id, plantName: plants.plantName,
                        plantLight: plants.plantLight, plantWater: plants.plantWater, petFriendly: plants.petFriendly,
                      plantImage: plants.plantImage, moreInfo: plants.moreInfo, lastWater: new Date(), nextWater: "",
                    waterFrequency: plants.waterFrequency},
                    refetchQueries: [
                      { query: QUERY_USER_PLANT}
                    ]  })
                      }
                          >
                          {savedPlantIds?.some((savedId) => savedId === plant.plantId)
                            ? "It's ok he's already adopted"
                            : 'Adopt this plant🌱'}
                        </Button>
                      </div>
                    </Row>

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