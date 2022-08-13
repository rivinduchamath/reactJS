import styled from '@emotion/styled';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Divider
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Iconify from '../components/Iconify';
import Page from '../components/Page';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0px 1px 4px 1px #ccc'
}));

const EntityItem = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '2% 3%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:hover': {
    backgroundColor: '#ddd',
    borderRadius: '6px'
  }
}));

function EntityViewer() {
  const navigate = useNavigate();

  // navigate user to entity viewer page
  const handleNavigateBack = () => {
    navigate('/dashboard/cv-list');
  };

  return (
    <Page title="New Upload | Aardvark">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Entity List
          </Typography>
          <Button
            variant="outlined"
            onClick={handleNavigateBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            go back
          </Button>
        </Stack>
        <Card
          sx={{
            borderRadius: '6px',
            padding: '1vw'
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography>Resume Name</Typography>
            <Tooltip title="download CV">
              <IconButton>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Card>
        <Grid
          container
          sx={{ marginTop: '1vw !important' }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Box sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h4" color="GrayText">
                        Entity Type
                      </Typography>
                      <Tooltip title="copy to clipboard">
                        <IconButton>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                  <Divider variant="middle" sx={{ width: '100%' }} />
                  <Box
                    sx={{
                      width: '100%',
                      maxHeight: '420px',
                      overflowY: 'scroll',
                      scrollbarWidth: '0.5em',
                      '-ms-overflow-style': '0.5em',
                      '&::-webkit-scrollbar': {
                        width: '0.5em'
                      },
                      '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px'
                      },
                      '&::-webkit-scrollbar-thumb': {
                        width: '0.5em',
                        backgroundColor: '#eee',
                        outline: '1px solid #ddd',
                        borderRadius: '8px'
                      }
                    }}
                  >
                    <List>
                      {Array.from(Array(12)).map((_, index) => (
                        <ListItem key={index}>
                          <Tooltip title={`Entity Itemwwwwwwwwwwwwwwwwwwwwwwww 0${index}`}>
                            <EntityItem>Entity Itemwwwwwwwwwwwwwwwwwwwwwwww 0{index}</EntityItem>
                          </Tooltip>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Stack>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default EntityViewer;
