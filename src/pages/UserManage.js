import { useEffect, useState } from 'react';

// material
import { Button, Container, TextField, Paper, TableCell } from '@mui/material';
// components
import { makeStyles } from '@mui/styles';
import { AddNewCustomer, LoadUserProfiles } from '../services/ApiCollection';
import { UserMoreMenu } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------
export default function User() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }));
  const paperStyle = { padding: '50px 20px', width: 1000, margin: '20px auto' };
  const tableStyle2 = { width: 1000, textAlign: 'center', padding: 33 };
  const tableStyle = { width: 1000 };
  const [username, setName] = useState('');
  const [email, setAddress] = useState('');
  const [customers, setCustomers] = useState([]);
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    const customerRegistrationDTO = { username, email };
    AddNewCustomer(customerRegistrationDTO).then((r) => console.log(r));
  };

  useEffect(() => {
    LoadUserProfiles().then((result) => {
      setCustomers(result);
    });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Add Customer</u>
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Customer Name"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Customer Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        <h1>All Users</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ padding: 34 }}>ID</th>
              <th style={{ padding: 34 }}>Name</th>
              <th style={{ padding: 34 }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customerRegistrationDTO) => (
              <tr elevation={6} key={`${customerRegistrationDTO.email}`}>
                <td style={tableStyle2}>{` ${customerRegistrationDTO.id}`}</td>
                <td style={tableStyle2}>{` ${customerRegistrationDTO.username}`}</td>
                <td style={tableStyle2}>{` ${customerRegistrationDTO.email}`}</td>
                <td style={tableStyle2} align="right">
                  <UserMoreMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );
}
