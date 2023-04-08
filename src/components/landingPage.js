import React from 'react';
import {useTranslation} from 'react-multi-lang';
import {useTheme} from "@mui/material/styles";
import {Box, Container, Grid, Typography, Fade} from "@mui/material";
import desc_img_1 from '../resources/team-work.png'
import desc_img_2 from '../resources/desc_img_2.png'
import desc_img_3 from '../resources/desc_img_3.png'
import {Image} from 'mui-image'

const LandingPage = () => {
        const t = useTranslation()
        const theme = useTheme()
        const motto = t('landing-page.motto').replaceAll('\n\n', '\n').split('\n')
        const desc = t('landing-page.desc').replaceAll('\n\n', '\n').split('\n')
        const images = [desc_img_1, desc_img_2, desc_img_3]

        const content = motto.map((val, index) => {
            return {
                motto: motto[index],
                desc: desc[index],
                img: images[index]
            }
        })
        const transition_timeout = {enter: 1000}
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
                        return <Grid container spacing={0} mt={index > 0 ? 10 : 0} key={index}>
                            <Fade in={true} timeout={transition_timeout}>
                                <Grid item md={6}>
                                    <Typography variant="h2">{val.motto}</Typography>
                                    <Typography variant="subtitle1" sx={{
                                        textAlign: 'justify',
                                        textJustify: 'inter-word',
                                        mt: '1em'
                                    }}>{val.desc}</Typography>
                                </Grid>
                            </Fade>
                            <Grid item md={6} xs={12} sx={{
                                alignItems: "center",
                                justifyContent: "center",
                                verticalAlign: 'middle',
                            }} mt={{
                                xs: 10,
                                md: 0
                            }}>
                                <Box sx={{
                                    height: '100%',
                                    width: '100%'
                                }}>
                                    <Image src={val.img} duration={1000} shift={"left"} sx={{
                                        maxWidth: '350px',
                                        height: 'auto'
                                    }}/>
                                </Box>
                            </Grid>
                        </Grid>
                    })}


                </Container>
            </Box>
        );
    }
;

export default LandingPage;