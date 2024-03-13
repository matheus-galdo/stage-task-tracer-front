import { PlusCircleFilled } from "@ant-design/icons";
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
export const TimelineCardContainer = styled.aside<SubProcessItemProps>`
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
        background-color: ${({ selected }) => selected ? '#33bb92' : 'rgba(255, 255, 255, 0.06)'};
    }
`;

export const TimelinePipeContainer = styled.div`
    width: 20px;
    display: flex;
    align-items: center;
`;

export const TimelinePipe = styled.div`
    width: 2px;
    background-color: #fff;
    height: 100px;
`;

export type TimelineMarkerProps = {
    selected: boolean;
}
export const TimelineMarker = styled.div<TimelineMarkerProps>`
    width: 20px;
    height: 20px;
    border: 4px solid #2C2C2C;
    margin-left: -11px;
    border-radius: 10px;
    background-color: #fff;

    ${({ selected }) => selected && 'border-color: #28A781;'}

    transition: border-color ease-in-out .1s;

    &:hover{
        border-color: ${({ selected }) => selected ? '#33bb92' : 'rgba(255, 255, 255, 0.06)'};
    }
`;

export const CustomPlusCircle = styled(PlusCircleFilled)`
    font-size: 1.4rem;
`;
