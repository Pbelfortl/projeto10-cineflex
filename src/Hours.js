import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import loading from "./img/loading.gif"

export default function Movie() {

    const params = useParams()
    const [times, setTimes] = useState([])
    const [info, setInfo] = useState([])

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${params.idFilme}/showtimes`)

        promise.then((ans) => infoAdd(ans.data, ans.data.days))

        promise.catch((ans)=> (alert(ans.response.message)))

    }, [params.idFilme])

    function infoAdd (info, days ) {
        setInfo(info)
        setTimes(days)
    }

    if (times.length === 0) {
        return (
            <Load>
                <img src={loading} alt={'Loading'} />
            </Load>
        )
    }

    return (
        <>
            <Title>
                Selecione o horário
            </Title>
            <ShowTimes>
                {(times).map((section) =>
                    <>
                        {`${section.weekday} - ${section.date}`}
                        <Day key={section.id}>
                            {section.showtimes.map((shows) =>
                            <Link to={`/assentos/${shows.id}`}>
                                <Hour key={shows.id}>
                                    {shows.name}
                                </Hour>
                            </Link>)
                            }
                        </Day>
                    </>
                )}
            </ShowTimes>
            <MovFooter>
                {<img src={info.posterURL} alt={'Cover'}/>}
                {info.title}
            </MovFooter>
        </>
    )
}

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

const ShowTimes = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    font-size:20px;
    height: 587px;
    width: 375px;
    overflow-y:scroll;
    padding:20px;
    border: solid 1px #DFE6ED; 
`

const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 587px;
    width: 375px;
`

const Day = styled.div`
    display:flex;
    font-family: 'Roboto', sans-serif;
    margin: 5px;
    a{
        text-decoration:none;
    }

`

const Hour = styled.div`
    display:flex;
    margin: 15px;
    margin-left:0px;
    background-color: #E8833A;
    color: #293845;
    color: white;
    width: 83px;
    height: 43px;
    border-radius:3px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover{
        cursor: pointer;
    }
`

const MovFooter = styled.div`
    width: 375px;
    height: 117px;
    background-color:#DFE6ED;
    display:flex;
    justify-content: left;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    color: #293845;
    img{
        height: 72px;
        width: 48px;
        margin:15px;
        border:8px solid white;
        border-radius:2px;
    }
`