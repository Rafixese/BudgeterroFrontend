import React from 'react';
import './landingPage.css'
import {useTranslation} from 'react-multi-lang';
import {useTheme} from "@mui/material/styles";
import {Box, Container, Grid, Typography, Fade} from "@mui/material";

const LandingPage = () => {
        const t = useTranslation()
        const theme = useTheme()
        const motto = t('landing-page.motto').replaceAll('\n\n', '\n').split('\n')
        const desc = t('landing-page.desc').replaceAll('\n\n', '\n').split('\n')

        const content = motto.map((val, index) => {
            return {
                motto: motto[index],
                desc: desc[index]
            }
        })
        const transition_timeout = {enter: 5000}
        return (
            <Box sx={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper,
                backgroundImage: theme.palette.mode === 'dark' ? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : '',
                paddingTop: "1rem",
                paddingBottom: "1rem",
                color: theme.palette.primary.contrastText,
            }}>
                <Container>

                    {content.map((val, index) => {
                        return <Grid container spacing={0} mt={index>0?10:0}>
                            <Fade in={true} timeout={transition_timeout}>
                                <Grid sm={6}>
                                    <Typography variant="h2">{val.motto}</Typography>
                                    <Typography variant="subtitle1" sx={{
                                        textAlign: 'justify',
                                        textJustify: 'inter-word',
                                        mt: '1em'
                                    }}>{val.desc}</Typography>
                                </Grid>
                            </Fade>
                            <Grid sm={6}>
                                PLACEHOLDER
                            </Grid>
                        </Grid>
                    })}


                </Container>
            </Box>
        );
    }
;

export default LandingPage;