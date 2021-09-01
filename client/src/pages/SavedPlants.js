import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
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
  console.log("dataaaaaaaa", userData)
  // create function that accepts the plants's mongo _id value as param and deletes the plant from the database
  const handleDeletePlant = async (plantId) => {
    // get token
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
        <CardColumns>
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
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPlants;
