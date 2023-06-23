import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

export default function Index() {
    const [userdetails, setUserdetails] = useState([]);
    const [formValues, setFormValues] = useState({
        User_Name: '',
        First_Name: '',
        Last_Name: '',
        Phone_Number: '',
        Email: '',
    });

    useEffect(() => {
        // Retrieve user details from local storage on component mount
        const storedUserDetails = localStorage.getItem('userdetails');
        if (storedUserDetails) {
            setUserdetails(JSON.parse(storedUserDetails));
        }
    }, []);

    useEffect(() => {
        // Update local storage whenever userdetails state changes
        localStorage.setItem('userdetails', JSON.stringify(userdetails));
    }, [userdetails]);

    const isUniqueUserName = (userName) => {
        return !userdetails.some((user) => user.User_Name === userName);
    };

    const isValidEmail = (value) => {
        const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailpattern.test(value);
    };

    const isValidMobile = (value) => {
        const mobilepattern = /^(?!0)\d{1,10}$/;
        return mobilepattern.test(value);
    };

    const isValidFirstname = (value) => {
        const fname = /^[a-zA-Z]*$/;
        return fname.test(value);
    };

    const isValidLastname = (value) => {
        const lname = /^[a-zA-Z]*$/;
        return lname.test(value);
    };

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddUser = () => {
        if(User_Name===""||First_Name===""||Last_Name===""||Phone_Number===""||Email===""){
            alert("Enter all the fields");
        }
        if (!isValidEmail(formValues.Email)) {
            alert('Invalid email address. Please enter a valid email.');
            return;
        }
        if (!isValidMobile(formValues.Phone_Number)) {
            alert('Invalid mobile number.');
            return;
        }
        if (!isUniqueUserName(formValues.User_Name)) {
            alert('Username already taken...');
            return;
        }
        if (!isValidFirstname(formValues.First_Name)) {
            alert('Firstname should contain only alphabets');
            return;
        }
        if (!isValidLastname(formValues.Last_Name)) {
            alert('Lastname should contain only alphabets');
            return;
        }

        alert('Details stored in table...');

        // Create a new user object from formValues
        const user = { ...formValues };

        // Add the new user to the userdetails array
        setUserdetails([...userdetails, user]);

        // Reset the form values
        setFormValues({
            User_Name: '',
            First_Name: '',
            Last_Name: '',
            Phone_Number: '',
            Email: '',
        });
    };

    const handleDeleteUser = (index) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            setUserdetails((prevState) => {
                const updatedUserdetails = [...prevState];
                updatedUserdetails.splice(index, 1);
                return updatedUserdetails;
            });
        }
    };


    const { User_Name, First_Name, Last_Name, Email, Phone_Number } = formValues;

    return (
        <>
            <Typography variant='h6' color={'primary'} sx={{ textAlign: 'center' }} >USER_TABLE</Typography>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <form className='container'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="User_Name"
                                        label="User Name"
                                        value={User_Name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="First_Name"
                                        label="First Name"
                                        value={First_Name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Last_Name"
                                        label="Last Name"
                                        value={Last_Name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Phone_Number"
                                        label="Phone Number"
                                        value={Phone_Number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Email"
                                        label="Email"
                                        value={Email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="button" variant="contained" color="primary" onClick={handleAddUser}>
                                        Add User
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <TableContainer>
                            <Table style={{ border: '1px solid black' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>User_Name</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>First_Name</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Last_Name</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Phone_Number</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userdetails.map((value, index) => (
                                        <TableRow key={index} style={{ border: '1px solid black' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>{value.User_Name}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>{value.First_Name}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>{value.Last_Name}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>{value.Phone_Number}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>{value.Email}</TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{ display: 'block', margin: '5px 5px 0 auto' }}
                                                onClick={() => handleDeleteUser(index)} // Pass the index to the delete function
                                            >
                                                Delete
                                            </Button>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

