import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Capitalize } from '../Functions';
import {useParams} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

const PokemonExt = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);
    const typeColours = {normal: ["#9FA19F", "#C1C2C1"],
                        fighting: ["#FF8000", "#FFAC59"],
                        flying: ["#81B9EF", "#ADD2F5"],
                        poison: ["#9141CB", "#B884DD"],
                        ground: ["#915121", "#B88E6F"],
                        rock: ["#AFA981", "#CBC7AD"],
                        bug: ["#91A119", "#B8C26A"],
                        ghost: ["#704170", "#A284A2"],
                        steel: ["#60A1B8", "#98C2D1"],
                        fire: ["#E62829", "#EF7374"],
                        water: ["#2980EF", "#74ACF5"],
                        grass: ["#3FA129", "#82C274"],
                        electric: ["#FAC000", "#FCD659"],
                        psychic: ["#EF4179", "#F584A8"],
                        ice: ["#3DCEF3", "#81DFF7"],
                        dragon: ["#5060E1", "#8D98EC"],
                        dark: ["#624D4E", "#998B8C"],
                        fairy: ["#EF70EF", "#F5A2F5"],
                        stellar: ["#44628D", "#8599B5"]};

    const fetchPokemonInfo = () => {
        try{
            let apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`;

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
        <div style={{ justifyContent: 'center', display: 'flex'}}>
            {
                loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Card style={{ width: '18rem', backgroundColor: typeColours[pokemon.types[0].type.name][1], borderColor: typeColours[pokemon.types[0].type.name][0], borderWidth: "5px" }}>
                        <Card.Img variant="top" src={pokemon.sprites.front_default} />
                        <Card.Body>
                            <Card.Title>{Capitalize(pokemon.name)}</Card.Title>
                            <Card.Text>
                                Typing: {Capitalize(pokemon.types[0].type.name) + (
                                pokemon.types.length > 1 ? (
                                    "/" + Capitalize(pokemon.types[1].type.name)
                                ) : (""))}
                            </Card.Text>
                            <Card.Text>
                                Ability: {Capitalize(pokemon.abilities[0].ability.name) + (
                                    (pokemon.abilities.length > 1 && !pokemon.abilities[1].is_hidden) ? (
                                        "/" + Capitalize(pokemon.abilities[1].ability.name)
                                    ) : (""))}
                            </Card.Text>
                            {(pokemon.abilities.length == 2  && pokemon.abilities[1].is_hidden) ? (
                            <Card.Text>Hidden Ability: {Capitalize(pokemon.abilities[1].ability.name)}</Card.Text>) : null}
                            {(pokemon.abilities.length == 3  && pokemon.abilities[2].is_hidden) ? (
                            <Card.Text>Hidden Ability: {Capitalize(pokemon.abilities[2].ability.name)}</Card.Text>) : null}
                            {pokemon.stats.map((stat) => {
                                return <Card.Text>
                                    {Capitalize(stat.stat.name) + ": " + stat.base_stat}
                                </Card.Text>
                            })}
                        </Card.Body>
                        <LinkContainer to={"/"}>
                            <Card.Link>Return</Card.Link>
                        </LinkContainer>
                    </Card>
                )
            }
        </div>
    );
}

export default PokemonExt;