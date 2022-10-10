import styled from "styled-components"
import pack from "./pack"
import { useNavigate } from "react-router-dom"

export default function Success () {

    const navigate = useNavigate()
    
    return(
        <>
            <Title>
                Pedido feito com sucesso!
            </Title> 
            <Info>
                <SecTitle data-identifier="movie-session-infos-reserve-finished">Filme e sessão</SecTitle>
                {pack.movName}
                <br/>
                {pack.movDate} - {pack.movTime}
            
                <SecTitle data-identifier="seat-infos-reserve-finished">Ingressos</SecTitle>
                {pack.seatNames.map((N)=>
                    <>Assento:{N}<br/></>
                )}
            
                <SecTitle data-identifier="buyer-infos-reserve-finished">Comprador</SecTitle>
                Nome: {pack.name}
                <br/>
                cpf: {pack.cpf}

                <Footer>
                <button onClick={backHome} data-identifier="back-to-home-btn">Voltar pra Home</button>
                </Footer>
            </Info>
        </> 
    )

    function backHome () {
        pack.seatNames = []
        pack.ids = []
        navigate("/")
    }
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
    border-bottom:none;
    color: #247A6B;
    font-weight:700;
`
const SecTitle = styled.div`
    color: #293845;
    font-size: 24px;
    font-weight: 700;

`
const Footer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    button{
        background-color: #E8833A;
        width: 225px;
        height: 42px;
        border: none;
        border-radius: 3px;
        color:white;
        font-size: 18px;
        font-weight: 400;
        &:hover{
            cursor: pointer;
        }
    }
`
const Info = styled.div`
    padding: 20px;
    font-size:22px;
    font-weight: 400;
    color: #293845;
    height: 664px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    border: solid 1px #DFE6ED; 
`