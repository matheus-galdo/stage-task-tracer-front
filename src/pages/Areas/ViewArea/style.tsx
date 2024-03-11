import { styled } from "styled-components";

export const PageContainer = styled.div`
    display: flex;
`;

export const ContentContainer = styled.main`
    padding: 1rem 2rem;
    margin-left: 240px;
    flex-grow: 1;
`;

export const Title = styled.h1`
    margin-bottom: 2rem;
    padding: 0 2rem;
`;

export const ProcessContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ProcessItem = styled.article`
    height: 80px;
    background-color: #202020;
    border-radius: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 2rem;

    transition: background ease-in-out .1s;

    &:hover{
        background-color: #259171;
    }
`;