/*
** TODO:
** - Implement an About page for each pokemon, similar to the individual launch pages
**      from the Rocket launches example in class.
*/

import {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'


const About = () => {

    const {id} = useParams()
    const [pokemon, setPokemon] = useState(null)

    const fetchPokemonInfo = () => {
        try{
            let apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`

            axios.get(apiURL)
            .then(response => {
                console.log(`response from API : ${JSON.stringify(response.data)}`);
                if (response.data !== undefined){
                    setPokemon(response.data)
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
            <h1> About </h1>

            {
                pokemon ? (
                    <div>
                        <p>Pokemon Sprite</p>
                        <p>Pokemon Name</p>
                        <p>Type: </p>
                        {/*  If more than one type, list it, otherwise only list one.  */}
                        <p>Generation: </p>
                        <h5>Stats</h5>
                        {/*  list each stat and stuff etc idk if this is needed  */}
                        {/*  List more information about the specific pokemon  */}
                    </div>
                ) : (
                    <div>
                        <p> Data could not be retrieved. </p>
                    </div>
                )
            }

            <Button variant="primary" as={Link} to="/" >Back to Home</Button>

        </div>
    )
}

export default About;