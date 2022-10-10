import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import loading from "./img/loading.gif"
import pack from "./pack"
import BackArrow from "./img/BackArrow.png"
import SelectSeat from "./SelectSeat"

export default function Seats() {

    const params = useParams()
    const [seats, setSeats] = useState()
    const [info, setInfo] = useState()
    const [name, setName] = useState()
    const [cpf, setCpf] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idFilme}/seats`)

        promise.then((ans) => infoAdd(ans.data, ans.data.seats))

        promise.catch((ans) => (alert(ans.response.message)))

    }, [params.idFilme])

    function infoAdd(movInfo, movSeats) {
        setSeats(movSeats)
        setInfo(movInfo)
    }

    if (info === undefined) {
        return (
            <Load>
                <img src={loading} alt={'Loading'} />
            </Load>
        )
    }

    function requestSeats (event) {

        event.preventDefault()
        if(pack.ids.length === 0){
            alert('Slecione pelo menos um assento!')
            return
        }

        pack.name = name
        pack.cpf = cpf
        pack.movName = info.movie.title
        pack.movDate = info.day.date
        pack.movTime = info.name
        const requestInfo = {ids:pack.ids, name:name, cpf:cpf}  

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', requestInfo)

        promise.then(()=>navigate("/sucesso"))

        promise.catch(()=>alert('Algo deu errado!'))
    }

    function back () {
        pack.ids = []
        pack.seatNames = []
        navigate(`/sessoes/${pack.secId}`)
    }

    return (
        <Container>
            <Title>
                <BackButton onClick={back}><img src={BackArrow} alt='' /></BackButton>
                Selecione o(s) assentos(s)
            </Title>
            <Places>
                {seats.map((S) =>
                    <SelectSeat available={S.isAvailable} seatId={S.id} name={S.name} pack={pack} ></SelectSeat>
                )}
            </Places>
            <ColorTip>
                <Seat available={'selecionado'} data-identifier="seat-selected-subtitle"><br /><br /><br />Selecionado</Seat>
                <Seat available={true} data-identifier="seat-available-subtitle"><br /><br /><br />Disponível</Seat>
                <Seat available={false} data-identifier="seat-unavailable-subtitle"><br /><br /><br />Indisponível</Seat>
            </ColorTip>
            <Form onSubmit={requestSeats}>
                <label>Nome do comprador</label>
                <input type="text" required onChange={e => setName(e.target.value)} data-identifier="buyer-name-input" placeholder="Digite seu nome..."></input>
                <label>CPF do comprador</label>
                <input type="number" required  onChange={e => setCpf(e.target.value)} data-identifier="buyer-cpf-input" placeholder="Digite seu cpf..."></input>
                <br/><br/>
                <FormButton>
                    <button type="submit" data-identifier="reservation-btn">Reservar assento(s)</button>
                </FormButton>
            </Form>
            <MovFooter data-identifier="movie-and-session-infos-preview">
                {<img src={info.movie.posterURL} alt={'Cover'} />}
                {info.movie.title}
                <br />{info.day.weekday} - {info.name}
            </MovFooter>
        </Container>
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
    border-bottom: solid 1px #DFE6ED; 
    position: relative;
`
const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 794px;
    width: 375px;
    justify-content: space-between;
    background-color: white;
    border: solid 1px #DFE6ED; 
`

const Places = styled.div`
    box-sizing: border-box;
    display: flex;
    max-width: 375px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
`
const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 587px;
    width: 375px;
`

const Seat = styled.li`
    width: 26px;
    height: 26px;
    background-color: ${props => (props.available === true) ? '#C3CFD9' : (props.available === 'selecionado') ? '#0E7D71' : '#F7C52B'};
    margin: 4px;
    margin-top:9px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size:11px;
    font-family:'Roboto',sans-serif;
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

const ColorTip = styled.div`
    display:flex;
    justify-content:space-around;
    margin-bottom:40px;
`

const Form = styled.form`
    box-sizing: border-box;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: center;
    height: 170px;
    justify-content: space-around;
    margin: 25px;
    label{
        font-size: 18px;
        font-weight: 400;
        color: #293845;
        margin-top: 10px;
    };
    input{
        width: 310px;
        line-height: 40px;
        font-size:20px;
        border: solid 1px #D4D4D4;
        ::placeholder{
            color:#AFAFAF;
        }
    }
`
const FormButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        width: 225px;
        height: 42px;
        border:none;
        background-color: #E8833A;
        color:white;
        font-size: 18px;
        font-weight: 400;
        border-radius:3px;
        cursor: pointer;
    }
`
const BackButton = styled.div`
    width: 15px;
    height: 15px;
    position: absolute;
    top:5px;
    left: 10px;
    img {
        width: 20px;
        height:15px;
        cursor: pointer;
    }
`