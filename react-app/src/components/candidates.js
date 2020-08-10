import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/candidate";
import { Grid, Paper, TableContainer, TableHead, TableRow, Table, TableCell, TableBody, withStyles } from "@material-ui/core";
import CandidateForm from "./candidateForm";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head":{
            fontSize: "1.25em"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Candidates = ({classes, ...props}) => {
    useEffect(() => {
        props.fetchAllCandidates()
    }, [])

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <CandidateForm />
                </Grid>

                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.candidateList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell> {record.fullName}</TableCell>
                                                <TableCell> {record.phone}</TableCell>
                                                <TableCell> {record.bloodGroup}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    candidateList: state.candidate.list
})

const mapActionToProps = {
    fetchAllCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (Candidates));