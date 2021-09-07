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
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1 style={{textAlign: "center"}}>Viewing {userData.user}'s plants!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPlants?.length
            ? `Viewing ${userData.savedPlants.length} saved ${
                userData.savedPlants.length === 1 ? 'plants' : 'plantss'
              }:`
            : 'You have no saved plants!'}
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
