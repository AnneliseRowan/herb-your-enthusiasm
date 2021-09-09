import React from 'react';
import {
  Jumbotron,
  Container,
  CardGroup,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER_PLANT } from '../utils/queries';
import { REMOVE_PLANT } from '../utils/mutations';
import { removePlantId } from '../utils/localStorage';

import './Style.css'

import Auth from '../utils/auth';

const SavedPlants = () => {
  const { loading, data } = useQuery(QUERY_USER_PLANT);
  
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);
  
  const userData = data?.userplants || {};

  const user = Auth.getProfile()

  const handleDeletePlant = async (plantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePlant({
        variables: { plantId },
      });

      // upon success, remove plants's id from localStorage
      removePlantId(plantId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div>
          <div style={{
            backgroundColor: "#C2CAD0",
            display: "flex",
            paddingBottom: "20px",
            marginTop: "45px"
          }}> 
              <div style={{marginLeft: "15%", paddingTop: "30px", paddingBottom: "5px"}}>
                  <img style={{width: "190px", height: "190px", borderRadius: "80px"}} 
                  src="https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2019&q=80"
                  />
                  <span style={{fontFamily: 'Oleo Script, cursive', fontSize: "96px", marginLeft: "20px"}}>{user.data.username}'s Plant Family</span>
              </div>
          </div>
        </div>
      <Container>
        <h2 style={{textAlign: "center", marginTop: "45px"}}>
          {userData.length        
            ? `See Your Garden!`:
             'Uh-Oh, Hurry! Adopt some plants!'}
        </h2>
      </Container>
        <Row xs={1} md={2} lg={4} >
          {data.userplants?.map((plant) => (
            <Col key={plant._id}>
              <Card  border="light" style={{width: "24rem", margin:"10px", padding: "0px 10px 0px 10px"}} id="cardSizing">
                {plant.plantImage ? (
                  <Card.Img style={{height:"36rem"}}
                    src={plant.plantImage}
                    alt={`The image for ${plant.plantName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title style={{fontFamily: 'Oleo Script, cursive', fontSize:"32px", textAlign:"center"}}>{plant.plantName}</Card.Title>
                  <p className="medium">Sun: {plant.plantLight}</p>
                  <p className="medium">Water: {plant.plantWater}</p>
                  {/* <p className="medium">Pet-Friendly: {checkTrue(plant.petFriendly)}</p> */}
                  <Button
                    className="btn-block"
                    style={{backgroundColor: "#88BDBC"}}
                    onClick={() => handleDeletePlant(plant._id)}
                  >
                    Adios Plant!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    </>
  );
};

export default SavedPlants;
