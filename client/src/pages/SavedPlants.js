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
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PLANT } from '../utils/mutations';
import { removePlantId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedPlants = () => {
  const { loading, data } = useQuery(QUERY_ME);
  
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);

  const userData = data?.me || {};

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
            <div className="bg-light" style={{
                display: "flex",
                // justifyContent: "space-between",
                // alignContent: "center",
                // margin: "20px 0px 0px 0px",
                paddingBottom: "20px",
                marginTop: "45px"
                // borderBottom: "3px solid grey"
            }}> 
                <div style={{marginLeft: "15%"}}>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}} 
                    src="https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2019&q=80"
                    />
                    <span style={{fontFamily: 'Oleo Script, cursive', fontSize: "96px", marginLeft: "20px"}}>{userData.name}'s Plant Family</span>
                </div>
            </div>
        </div>
      <Container>
        <h2 style={{textAlign: "center", marginTop: "45px"}}>
          {userData.savedPlants?.length
            ? `Viewing ${userData.savedPlants.length} saved ${
                userData.savedPlants.length === 1 ? 'plants' : 'plants'
              }:`
            : 'Uh-Oh, Hurry! Adopt some plants!'}
        </h2>
        <Row xs={1} md={2} className="g-4">
          <Col >
            {userData.savedPlants?.map((plant) => {
              return (
                <Card key={plant.plantId} border="dark">
                  {plant.image ? (
                    <Card.Img
                      src={plant.image}
                      alt={`The image for ${plant.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <p className="small">Water: {plant.water}</p>
                    <Card.Text>{plant.light} {plant.pet} </Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeletePlant(plant.plantId)}
                    >
                      Delete this Plant!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SavedPlants;
