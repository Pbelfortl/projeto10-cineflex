import { useState } from "react"
import styled from "styled-components"

export default function SelectSeat({ available, seatId, name, pack}) {

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
        <Seat available={select} data-identifier="seat" onClick={()=>chose(seatId)}>{name}</Seat>
    )

}

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