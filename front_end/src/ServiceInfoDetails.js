import styled from "styled-components";
import { createTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/system";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Typography } from "@mui/material";
import SelectName from './SelectList/ServiceName';
import SelectCategory from "./SelectList/SelectCategory";
import SelectDuration from "./SelectList/SelectTime";
import SelectPersonLimit from "./SelectList/SelectPersonLimit";
import SelectQuantity from "./SelectList/SelectQuantity";

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
            button: {
                primary: {
                    main: '#397CC2'
                },
                secondary: {
                    main: '#D3AC72'
                },
            }
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
                paddingLeft: 50,
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 400,
            },
            button: {
                fontSize: '1rem',
                fontWeight: 700,
                padding: 1,
            },
        },
        boxShadow: '-3px 0 5px rgba(0,0,0,0.4)'
    });

    const StyledServiceList = styled(Paper)`
        width: 390px;
        height: 100vh;
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
        width: 390px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: start;
       padding-left: 50px;
    `;

    const SelectListBox = styled.div`
        width: 390;
        height: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `

    const StyledButtonGroup = styled.button`
        width: 390px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `

    const ButtonText = [
        'Save',
        'Calendar & Availability'
    ];

    return (
        <ThemeProvider theme={theme}>
            <StyledServiceList
                elevation={8}
                sx={{ background: theme.palette.primary.main, }}
            >

                <ArrowBackOutlinedIcon sx={{ width: 30, height: 30, pt: 6, pl: 5.5 }} />
                <Typography variant="h3">
                    {ListTitle}
                </Typography>

                <Typography variant="h5">
                    {ListSubtitle[0]}
                </Typography>
                <SelectListWrapper>
                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[0]}</Typography>
                        <SelectName />
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[1]}</Typography>
                        <SelectCategory />
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[2]}</Typography>
                        <SelectDuration />
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[3]}</Typography>
                        <SelectPersonLimit />
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[4]}</Typography>
                        <SelectQuantity />
                    </SelectListBox>
                </SelectListWrapper>

                <Typography variant="h5">
                    {ListSubtitle[1]}
                </Typography>
                <SelectListWrapper>
                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[5]}</Typography>
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[6]}</Typography>
                    </SelectListBox>

                    <SelectListBox>
                        <Typography variant="subtitle1">{SelectTitle[7]}</Typography>
                    </SelectListBox>
                </SelectListWrapper>

                {/* <Button></Button> */}
            </StyledServiceList>
        </ThemeProvider>
    )
};
