import React, { useState } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/candidate";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1),
    }
})

const initialFieldValues = {
    fullName: '',
    phone: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const CandidateForm = ({ classes, ...props }) => {

    const validate = (fieldValues = values) => {
        let temp = {}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")

    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
           props.createCandidate(values, () => {window.alert('inserted.')})
        }
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />

                    <TextField name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.bloodGroup && { error: true })}
                    >
                        <InputLabel htmlFor="blood-group-outlined">BloodGroup</InputLabel>
                        <Select
                            native
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            label="bloodGroup"
                            inputProps={{
                                name: 'bloodGroup',
                                id: 'blood-group-outlined',
                            }}
                        >
                            <option value=''></option>
                            <option value='A+'>A +ve</option>
                            <option value='A-'>A -ve</option>
                            <option value='B+'>B +ve</option>
                            <option value='B-'>B -ve</option>
                            <option value='AB+'>AB +ve</option>
                            <option value='AB-'>AB -ve</option>
                            <option value='O+'>O +ve</option>
                            <option value='O-'>O -ve</option>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField name="phone"
                        variant="outlined"
                        label="Phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && { error: true, helperText: errors.phone })}
                    />
                    <TextField name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="Submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    candidateList: state.candidate.list
})

const mapActionToProps = {
    createCandidate: actions.create,
    updateCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(CandidateForm));