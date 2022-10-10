import styled from "styled-components"

export default function TopBar () {

    return (
        <Top>
            CINEFLEX
        </Top>
    )
}

const Top = styled.div`
    background-color:#C3CFD9;
    width: 377px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#E8833A;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
`