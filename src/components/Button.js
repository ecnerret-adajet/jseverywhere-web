import styled from 'styled-components';

const Button = styled.button`
    display: block;
    padding: 10px;
    border: none;
    font-size: 18px;
    color: #fff;
    background-color: #0077cc;
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }

    :active {
        background-coclor: #005fa3;
    }
`;

export default Button;
