import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import loading from "./img/loading.gif"
import pack from "./pack"

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
        pack.name = name
        pack.cpf = cpf
        pack.movName = info.movie.title
        pack.movDate = info.day.date
        pack.movTime = info.name
        const requestInfo = {ids:pack.ids, name:name, cpf:cpf}  

        if(pack.length === 0){
            alert('Slecione pelo menos um assento!')
            return
        }

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', requestInfo)

        promise.then(()=>navigate("/sucesso"))

        promise.catch(()=>alert('Algo deu errado!'))
    }

    return (
        <Container>
            <Title>
                Selecione o(s) assentos(s)
            </Title>
            <Places>
                {seats.map((S) =>
                    <SelectSeat available={S.isAvailable} seatId={S.id} name={S.name} pack={pack}></SelectSeat>
                )}
            </Places>
            <ColorTip>
                <Seat available={'selecionado'}><br /><br /><br />Selecionado</Seat>
                <Seat available={true}><br /><br /><br />Disponível</Seat>
                <Seat available={false}><br /><br /><br />Indisponível</Seat>
            </ColorTip>
            <Form onSubmit={requestSeats}>
                <label>Nome do comprador</label>
                <input type="text" required onChange={e => setName(e.target.value)}></input>
                <label>CPF do comprador</label>
                <input type="number" required  onChange={e => setCpf(e.target.value)}></input>
                <br/><br/>
                <FormButton>
                    <button type="submit">Reservar assento(s)</button>
                </FormButton>
            </Form>
            <MovFooter>
                {<img src={info.movie.posterURL} alt={'Cover'} />}
                {info.movie.title}
                <br />{info.day.weekday} - {info.name}
            </MovFooter>
        </Container>
    )
}


function SelectSeat({ available, seatId, name, pack}) {

    const [select, setSelect] = useState(available)

    function chose (seatId) {
        if(select === true) {
            setSelect('selecionado')
            pack.ids.push(seatId)
            pack.seatNames.push(name)
        }
        if(select === 'selecionado'){
            setSelect(true)
            const index = pack.ids.indexOf(seatId)
            pack.ids.splice(index, 1)
            pack.seatNames.splice(index,1) 
        }
        if(select === false){
            alert('Este assento está indisponível')
        }
    }

    return (
        <Seat available={select} onClick={()=>chose(seatId)}>{name}</Seat>
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

const ColorTip = styled.div`
    display:flex;
    justify-content:space-around;
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
    input{
        width: 327px;
        height: 51px;
    }
`
const FormButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        width: 225px;
        height: 42px;
    }
`