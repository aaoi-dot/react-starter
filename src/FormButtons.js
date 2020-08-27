import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
}));

export default function FormButtons(props) {
    const classes = useStyles();

    const [disabled, setDisabled] = React.useState(false);
    return (
        <div>
            <Button
                disabled={props.activeStep === 0}
                onClick={props.handleBack}
                className={classes.button}>
                Back
            </Button>
            <Button
                variant="contained"
                color="primary"
                disabled={props.disabled}
                onClick={props.handleNext}
                className={classes.button}

                type="submit"
            > {props.isFinished()}
            </Button>
        </ div >
    );
}
