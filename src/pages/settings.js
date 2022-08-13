import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../components/Iconify';
import Page from '../components/Page';

function Settings() {
  const navigate = useNavigate();
  return (
    <Page title="Settings | Aardvark">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            go back
          </Button>
        </Stack>
        <Typography variant="h3" color="GrayText">
          Profile
        </Typography>
        <Card>
          <Box sx={{ padding: '2% 3%' }}>
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '3%',
                  height: '12vw',
                  width: '70%',
                  boxShadow: 'none',
                  borderRadius: 'none'
                }}
              >
                <Avatar sx={{ width: '32%', height: '100%' }} variant="rounded">
                  <img
                    alt="profile"
                    src="https://www.pixinvent.com/materialize-material-design-admin-template/laravel/demo-4/images/user/12.jpg"
                  />
                </Avatar>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography variant="h3" color="primary.main">
                    Veronica Diseira
                  </Typography>
                  <Typography variant="body1" color="primary.secondary">
                    Project Manager
                  </Typography>
                </Box>
              </Card>
              <Box
                sx={{
                  width: '30%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <Button size="large" variant="contained">
                  Edit Settings
                </Button>
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ margin: '3% 0%' }} />
          <Typography color="GrayText" variant="h6" sx={{ marginBottom: '2%', marginLeft: '3%' }}>
            User Information
          </Typography>
          <Grid container sx={{ width: '100%', marginLeft: '0%', paddingBottom: '3%' }} spacing={4}>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="First Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="Last Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="Information 01" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="Information 02" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '0% 2%' }}>
              <TextField label="Information 03" fullWidth />
            </Grid>
          </Grid>
        </Card>
        <Typography variant="h3" color="GrayText" sx={{ margin: '2% 0% 1% 0%' }}>
          Connect
        </Typography>
        <Card sx={{ padding: '2% 3%' }}>
          <Stack
            display="flex"
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            spacing={3}
          >
            <Typography color="GrayText" variant="h6">
              Token Generation
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <TextField label="Token" sx={{ width: '50%', marginRight: '1%' }} />
              <Tooltip title="Copy token">
                <IconButton>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Button size="large" variant="contained">
                Generate New Token
              </Button>
            </Box>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

export default Settings;
