import axios from "axios"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import loading from "./img/loading.gif"

export default function HomePage() {

    const [items, setItems] = useState([])

    useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")

        request.then(ans => { setItems(ans.data) })     

        request.catch(error => { console.log(error.response.data) })

    }, [])

    if (items.length === 0) {
        return (
            <Load>
                <img src={loading} alt={'Loading'} />
            </Load>
        )
    }

    return (
        <>
            <Title>
                Selecione o filme
            </Title>
            <MoviesChart>
                {items.map((item) => 
                    <Poster key={item.id} >
                        <Link to={`sessoes/${item.id}`}>
                            <img src={item.posterURL} data-identifier="movie-outdoor" alt={'Cover'}/>
                        </Link>        
                    </Poster>)}
            </MoviesChart>
        </>
    )
}

const MoviesChart = styled.div`
    max-width:375px;
    height: 700px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    list-style: none;
    border: solid 1px #DFE6ED; 
`

const Title = styled.div`
    width: 375px;
    height:90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    color: #293845;
    border: solid 1px #DFE6ED; 
`
const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 587px;
    width: 375px;
`

const Poster = styled.div`
    width: 145px;
    height: 209px;
    margin-left:13px;
    margin-right: 15px;
    margin-bottom:2px;
    padding: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
    }
    img{
        width: 129px;
        height:193px;
    }
`