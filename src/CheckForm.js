import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import FormButtons from './FormButtons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function CheckboxesGroup(props) {
    const classes = useStyles();

    const osSelectionOptions = [
        { name: 'PP_Base_Win7', label: 'Base Windows 7' },
        { name: 'PP_Base_Win8', label: 'Base Windows 8' },
        { name: 'PP_Base_Win10', label: 'Base Windows 10' },
        { name: 'PP_Win7', label: 'Windows 7' },
    ]

    const [osState, setOsState] = React.useState([])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required')
    });

    const changed = (e) => {
        console.log(e.target.name)
        if (e.target.checked) {
            setOsState([...osState, e.target.name])
        } else {
            setOsState(osState.filter(item => item !== e.target.name))
        }
    }

    return (
        <div>{osState}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                }}
                validationSchema={validationSchema}
                validateOnMount={true}
                onSubmit={values => {
                    console.log(values)
                }}
            >
                {({
                    handleSubmit, handleChange, values, errors, touched, dirty, isValid }) => (
                        <div>
                            <form onSubmit={handleSubmit}>

                                <TextField
                                    required
                                    helperText={errors.firstName}
                                    type='text'
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    label="First Name"
                                />
                                <TextField
                                    type='text'
                                    helperText={errors.lastName}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    label="Last Name"
                                />
                                <FormGroup >
                                    {osSelectionOptions.map(function (item, index) {

                                        return <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    onClick={e => changed(e)}
                                                    onChange={handleChange}
                                                    name={item.name}
                                                />
                                            }
                                            label={item.label}
                                        />
                                    })}
                                </FormGroup>
                            </form>
                            <div>
                                <FormButtons
                                    handleNext={props.handleNext}
                                    disabled={!isValid || !dirty || osState == 0}
                                    isFinished={props.isFinished}
                                    handleBack={props.handleBack}
                                    activeStep={props.activeStep} />
                            </div>
                        </div>

                    )}
            </Formik>

        </div >

    );
    // const [state, setState] = React.useState({
    //     windows: false,
    //     windows_10: false,
    //     mac_os: false,
    // });

    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };

    // const { windows, windows_10, mac_os } = state;
    // const error = [windows, windows_10, mac_os].filter((v) => v).length !== 2;

    // return (
    //     <div className={classes.root}>
    //         <FormControl required error={error} component="fieldset" className={classes.formControl}>
    //             <FormLabel component="legend">Pick two</FormLabel>
    //             <FormGroup>
    //                 <FormControlLabel
    //                     control={<Checkbox checked={windows} onChange={handleChange} name="windows" />}
    //                     label="Windows"
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox checked={windows_10} onChange={handleChange} name="windows_10" />}
    //                     label="Windows 10"
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox checked={mac_os} onChange={handleChange} name="mac_os" />}
    //                     label="Mac Os"
    //                 />
    //             </FormGroup>
    //             <FormHelperText>You can display an error</FormHelperText>
    //         </FormControl>
    //     </div>
    // );
}
