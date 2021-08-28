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

import { useMutation } from '@apollo/client';
import { SAVE_PLANT } from '../utils/mutations';
import { savePlantIds, getSavedPlantIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchPlants = () => {
  // create state for holding returned google api data
  const [searchedPlants, setSearchedPlants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved plantId values
  const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());

  const [savePlant, { error }] = useMutation(SAVE_PLANT);

  // set up useEffect hook to save `savedPlantIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePlantIds(savedPlantIds);
  });

  // create method to search for plants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
    //   const response = await fetch(
    //     `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
    //   );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

    //   const { items } = await response.json();

      const plantData = items.map((plant) => ({
        plantId: plant.id,
        name: plant.name || ['No name to display'],
        water: plant.water,
        pet: plant.pet,
        image: plant.image,
      }));

      setSearchedPlants(plantData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a plant to our database
  const handleSavePlant = async (plantId) => {
    // find the plant in `searchedPlantss` state by the matching id
    const plantToSave = searchedPlants.find((plant) => plant.plantId === plantId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePlant({
        variables: { plantData: { ...plantToSave } },
      });
      console.log(savedPlantIds);
      setSavedPlantIds([...savedPlantIds, plantToSave.plantId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Plants!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Plant"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedPlants.length
            ? `Viewing ${searchedPlants.length} results:`
            : 'Search for a plant to begin'}
        </h2>
        <CardColumns>
          {searchedPlants.map((plant) => {
            return (
              <Card key={plant.plantId} border="dark">
                {plant.image ? (
                  <Card.Img
                    src={plant.image}
                    alt={`The cover for ${plant.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <p className="small">Sun: {plant.water}</p>
                  <Card.Text>{plant.sun}</Card.Text>
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
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPlants;

