import styled from 'styled-components';
import Inputs from 'components/Inputs';

export const SignUpBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 24px 0 0;
    width: 100%;
`;

export const Paragraph = styled.p`
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 16px;
    color: ${({ theme }) => theme.palette.gray['100']};
`;

export const ContentHolder = styled.div`
    margin: 0 0 60px;
`;

export const FieldRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const NameField = styled(Inputs.TextInput)`
    width: 48%;
    margin: 0;
`;