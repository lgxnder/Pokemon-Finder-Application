import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Capitalize } from '../Functions';
import {useParams} from 'react-router-dom';

const PokemonExt = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);

    const fetchPokemonInfo = () => {
        try{
            let apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`

            axios.get(apiURL)
            .then(response => {
                console.log(`response from API : ${JSON.stringify(response.data)}`);
                if (response.data !== undefined){
                    setPokemon(response.data);
                    setLoading(false);
                }else{
                    console.log(`No data provided from API`);
                }
                
            })
            .catch(err => {
                console.error(`Cannot access the data from API : ${err}`);
            })

        }catch(error){
            console.error(`Error while fetching data from API : ${error}`);
        }
    }

    useEffect( () => {fetchPokemonInfo()}, [])

    return(
        <div>
            {
                loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={pokemon.sprites.front_default} />
                        <Card.Body>
                            <Card.Title>{Capitalize(pokemon.name)}</Card.Title>
                            <ListGroup>
                                <ListGroup.Item>{Capitalize(pokemon.types[0].type.name) + (
                                pokemon.types.length > 1 ? (
                                    "/" + Capitalize(pokemon.types[1].type.name)
                                ) : (""))}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                )
            }
        </div>
    );
}

export default PokemonExt;