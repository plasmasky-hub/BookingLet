import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Typography } from "@mui/material";
import SelectCategory from "../../SelectList/SelectCategory";
import SelectDuration from "../../SelectList/SelectTime";
import SelectPersonLimit from "../../SelectList/SelectPersonLimit";
import SelectQuantity from "../../SelectList/SelectQuantity";

export const ServiceDetailList = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#C1CBD7'
            },
            secondary: {
                main: '#D3AC72'
            },
            text: {
                primary: {
                    main: '#000'
                },
                secondary: {
                    main: '#fff'
                }
            },
        },

        typography: {
            fontFamily: 'Helvetica',
            h3: {
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: 5,
                paddingLeft: 50,
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 700,
                lineHeight: 4,
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 2,
                padding: 8,
            },
        },
    });

    const StyledServiceList = styled(Paper)`
        width: 390px;
        height: 100vh;
        background: #C1CBD7;
        top: 0;
        right: 0;
        position: absolute;
    `;

    const ListTitle = 'Service Details';

    const ListSubtitle = [
        'Required Field',
        'Optional Field'
    ];

    const SelectTitle = [
        'Service :',
        'Category :',
        'Duration :',
        'Person Limit :',
        'Quantity :',
        'Description :',
        'Staff:',
        'Price:',
    ];

    const SelectListWrapper = styled.div`
        height: 500px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: start;
        padding-left: 50px;
    `;

    const SelectListTitleBox = styled.div`
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    `;

    const SelectListBox = styled.div`
        width: 240px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        align-content: start;
    `;

    const OptionalText = [
        '---',
        'Anna',
        '$50 per hour'
    ];

    const StyledTextArea = styled(Box)`
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: start;
        background: transparent;
        border: 1px solid #989898;
        text-align: center;
        align-items: center;
        border-radius: 4px;
        padding: 5px;
`;

    const StyledButtonGroup = styled(Button)`
        width: 390px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `;

    const ButtonText = [
        'Save',
        'Calendar & Availability'
    ];

    return (
        <ThemeProvider theme={theme}>
            <StyledServiceList elevation={8}>
                <ArrowBackOutlinedIcon sx={{ width: 30, height: 30, pt: 6, pl: 5.5 }} />
                <Typography variant="h3">{ListTitle}</Typography>
                <SelectListWrapper>
                    <SelectListTitleBox>
                        <Typography variant="h5">{ListSubtitle[0]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[0]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[1]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[2]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[3]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[4]}</Typography>
                        <Typography variant="h5">{ListSubtitle[1]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[5]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[6]}</Typography>
                        <Typography variant="subtitle1">{SelectTitle[7]}</Typography>
                    </SelectListTitleBox>
                    <SelectListBox>
                        <div>
                            <StyledTextArea>
                            <Typography variant="subtitle1">Foot Massage</Typography>
                            </StyledTextArea>
                            <SelectCategory />
                            <SelectDuration />
                            <StyledTextArea>
                            <Typography variant="subtitle1">1</Typography>
                            </StyledTextArea>
                            <StyledTextArea>
                            <Typography variant="subtitle1">1</Typography>
                            </StyledTextArea>
                        </div>
                        <div>
                        <StyledTextArea>
                            <Typography variant="subtitle1">{OptionalText[0]}</Typography>
                            </StyledTextArea>
                            <StyledTextArea>
                            <Typography variant="subtitle1">{OptionalText[1]}</Typography>
                            </StyledTextArea>
                            <StyledTextArea>
                            <Typography variant="subtitle1">{OptionalText[2]}</Typography>
                            </StyledTextArea>
                        </div>
                    </SelectListBox>
                </SelectListWrapper>
            </StyledServiceList>
        </ThemeProvider>
    )
};
