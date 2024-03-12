import { styled } from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    width: 100%;
`;

export const PageContent = styled.main`
    padding: 1rem 2rem;
    flex-grow: 1;
    margin-left: 240px;
`;

export type SubProcessItemProps = {
    selected: boolean;
}
export const SubProcessItem = styled.aside<SubProcessItemProps>`
    margin: 0px -24px;
    padding: 0px 24px;
    height: 100px;
    background-color: #2C2C2C;
    display: flex;
    align-items: center;

    ${({ selected }) => selected && 'background-color: #28A781;'}

    transition: background ease-in-out .1s;
    cursor: pointer;

    &:hover{
        background-color: ${({ selected }) => selected ?  '#33bb92' : 'rgba(255, 255, 255, 0.06)'};
    }
`;
