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
        variables: { _id: plantId }, 
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
                    <span style={{fontFamily: 'Oleo Script, cursive', fontSize: "96px", marginLeft: "20px"}}>{user.data.username}'s Plant Family</span>
                </div>
            </div>
        </div>
      <Container>
        <h2 style={{textAlign: "center", marginTop: "45px"}}>
          {data.userplants.savedPlants?.length        
            ? `Viewing ${userData.savedPlants.length} saved ${
                userData.length >= 1 ? 'plants' : 'plants'
              }`:
             'Uh-Oh, Hurry! Adopt some plants!'}
            {console.log(userData.length, 'UserData is here!!!')}
        </h2>
        <Row xs={1} md={2} className="g-4">
          <Col >
            {data.userplants?.map((plant) => {
              console.log(plant, 'plant data for card')
              return (
                <Card key={plant._id} border="dark">
                  {plant.plantImage ? (
                    <Card.Img
                      src={plant.plantImage}
                      alt={`The image for ${plant.plantName}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{plant.plantName}</Card.Title>
                    <p className="small">Water: {plant.plantWater}</p>
                    <Card.Text>{plant.plantLight} {plant.plantPet} </Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => removePlant( { variables: {_id: plant._id}}).then(window.location.reload())}
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
