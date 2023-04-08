import React from 'react';
import {Box, Alert} from "@mui/material";

const AlertDock = (props) => {
    let variant = props.variant
    let alerts = props.alerts
    return (
        <Box sx={props.sx}>
            {alerts.map((val, index) => {
                return <Alert sx={{mt:1}} key={index} variant={variant} severity={val.severity}>
                    {val.text}
                </Alert>
            })}
        </Box>
    );
};

export default AlertDock;