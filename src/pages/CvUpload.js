import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { find, includes, isEqual } from 'lodash';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  IconButton,
  TableFooter,
  Tooltip,
  Input,
  useMediaQuery,
  Collapse
} from '@mui/material';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// dropzone file uploader
import { useDropzone } from 'react-dropzone';
// components
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
// eslint-disable-next-line import/no-unresolved
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// context imports
import { SnackBarContext } from '../sections/context/Contexts';

const UploaderPara = styled('p')(({ theme }) => ({
  width: '100%',
  color: '#aaa',
  textAlign: 'center',
  fontSize: 'calc(0.5vw + 1em)'
}));

function Row(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // breakpoint for changing styles on the table
  const breakPointSm = useMediaQuery('(max-width: 668px)');
  const { file, index, handleRemoveFile } = props;

  return (
    <>
      <TableRow key={index + file.name} hover tabIndex={-1}>
        {breakPointSm && (
          <TableCell sx={{ width: '5vw' }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell
          sx={{
            fontSize: '0.8vw !important',
            width: breakPointSm ? '45vw' : '30vw'
          }}
        >
          <Tooltip title={file.name}>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                width: breakPointSm ? '40vw' : '25vw',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {file.name}
            </Typography>
          </Tooltip>
          <Tooltip title={`${file.size} bytes`}>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                width: breakPointSm ? '40vw' : '25vw',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {/* {Math.floor(file.size / 1024 ** 2)} bytes */}
              {file.size} bytes
            </Typography>
          </Tooltip>
        </TableCell>

        {!breakPointSm && (
          <TableCell sx={{ width: '45vw' }}>
            <TextField
              fullWidth
              id={index + file.name}
              variant="outlined"
              type="text"
              defaultValue={file.updatedName ? file.updatedName : file.name}
            />
          </TableCell>
        )}

        <TableCell sx={{ width: breakPointSm ? '20vw' : '15vw' }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
            {!breakPointSm && (
              <>
                <Tooltip title="Upload file">
                  <IconButton>
                    <FileUploadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Uploading progress ${'20%'}`}>
                  <IconButton>
                    <CircularProgressWithLabel value={20} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Remove file">
              <IconButton id={index} onClick={handleRemoveFile}>
                <Iconify id={index} color="primary.secondary" icon="eva:close-circle-outline" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse
            in={breakPointSm ? isCollapsed : false}
            timeout="auto"
            unmountOnExit
            sx={{ margin: '4% 0%' }}
          >
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
              <Typography
                variant="h6"
                color="GrayText"
                sx={{ width: 'fit-content', fontSize: '15px !important' }}
              >
                Enter Alternative Name
              </Typography>
              <Tooltip title="Upload file">
                <IconButton>
                  <FileUploadIcon fontSize="15px" />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Uploading progress ${'20%'}`}>
                <IconButton>
                  <CircularProgressWithLabel value={20} fontSize="15px" />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField
              fullWidth
              id={index + file.name}
              variant="outlined"
              type="text"
              defaultValue={file.updatedName ? file.updatedName : file.name}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CvUpload() {
  const navigate = useNavigate();
  // const snackBarContext = useContext(SnackBarContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  // breakpoint for changing styles on the table
  const breakPointSm = useMediaQuery('(max-width: 668px)');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - uploadedFiles.length) : 0;

  // update state when files are selected
  useEffect(() => {
    const newFiles = [];
    // remove duplicate selection
    acceptedFiles.forEach((file) => {
      if (!find(uploadedFiles, (uploadedFile) => uploadedFile.name === file.name)) {
        newFiles.push(file);
      }
    });
    if (newFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  }, [acceptedFiles]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemoveFile = (event) => {
    const files = uploadedFiles;
    files.splice(event.target.parentNode.id, 1);
    setUploadedFiles([...files]);
  };

  return (
    <Page title="New Upload | Aardvark">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Upload
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/dashboard/cv-list');
            }}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            go back
          </Button>
        </Stack>

        <Card
          sx={{
            padding: '2%',
            height: '30vh',
            borderRadius: uploadedFiles.length > 0 ? '16px 16px 0px 0px' : '16px'
          }}
        >
          <Box
            {...getRootProps({ className: '' })}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'none',
              cursor: 'pointer',
              gap: '1.5vw',
              border: '1px dotted #aaa',
              borderRadius: '5px'
            }}
          >
            <Input {...getInputProps()} />
            <Iconify icon="fa-solid:upload" sx={{ color: '#aaa', fontSize: 'calc(1.5vw + 1em)' }} />
            <UploaderPara>Drag 'n' drop CVs here, or click to select CVs</UploaderPara>
            <Button variant="contained" color="primary" size="small" disableElevation>
              Browse files
            </Button>
          </Box>
        </Card>
        {uploadedFiles.length > 0 && (
          <Card
            sx={{
              padding: '2%',
              marginTop: '-1%',
              borderRadius: '0px 0px 16px 16px'
            }}
          >
            <Box sx={{}}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{
                    marginBottom: '0.5vw',
                    boxSizing: 'border-box'
                  }}
                >
                  Selected files:
                </Typography>
                <Tooltip title="Upload all files">
                  <IconButton>
                    <FileUploadIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 200 }}>
                  <Table>
                    <TableBody>
                      {uploadedFiles.map((file, index) => (
                        <Row
                          key={index}
                          index={index}
                          file={file}
                          handleRemoveFile={handleRemoveFile}
                        />
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[]}
                          // rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={uploadedFiles.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page'
                            },
                            native: true
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Box>
          </Card>
        )}
      </Container>
    </Page>
  );
}

// https://62ea5d68ad295463258ab66b.mockapi.io/api/v1/
// https://cogardvark.free.beeceptor.com
