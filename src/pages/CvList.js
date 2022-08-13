import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Step,
  Stepper,
  StepLabel,
  Tooltip,
  IconButton,
  Collapse,
  Box,
  useMediaQuery
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { CvListToolbar } from '../sections/@dashboard/cvlist';

// API imports
import { GetCvList, GetCvList2 } from '../services/ApiCollection';

// ----------------------------------------------------------------------

const steps = [
  'cv upload',
  'create blocks',
  'entity extraction',
  'entity relation mapping',
  'completed'
];

// ----------------------------------------------------------------------

function Row(props) {
  const navigate = useNavigate();
  const breakPointSm = useMediaQuery('(max-width: 668px)');
  // const breakPointXs = useMediaQuery('(max-width: 400px)');
  const [isCollapsed, setIsCollapsed] = useState();
  const { isItemSelected, id, name, status, handleClick } = props;
  return (
    <>
      <TableRow
        hover
        key={id + name}
        tabIndex={-1}
        role="checkbox"
        selected={isItemSelected}
        aria-checked={isItemSelected}
      >
        {breakPointSm && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
        </TableCell>
        <TableCell>
          <Typography
            variant="subtitle2"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {name} s
          </Typography>
        </TableCell>
        {!breakPointSm && (
          <>
            <TableCell align="left">
              <Stepper alternativeLabel>
                {steps.map((step, index) => {
                  const activeStep = steps.indexOf(status);
                  return (
                    <Tooltip key={step} title={step}>
                      <Step
                        active={activeStep === index}
                        completed={activeStep === steps.length - 1 ? true : index < activeStep}
                        // sx={{ color: 'red' }}
                      >
                        <StepLabel>{/* {activeStep === index ? step : ''} */}</StepLabel>
                      </Step>
                    </Tooltip>
                  );
                })}
              </Stepper>
            </TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                {steps.indexOf(status) > steps.indexOf('entity extraction') && (
                  <Tooltip title="View entities">
                    <IconButton onClick={() => navigate('/dashboard/entity-viewer')}>
                      <Iconify color="primary.main" icon="ic:baseline-remove-red-eye" />
                    </IconButton>
                  </Tooltip>
                )}
                {steps.indexOf(status) > steps.indexOf('cv upload') && (
                  <Tooltip title="Download">
                    <IconButton onClick={() => console.log('file downloading')}>
                      <Iconify color="primary.main" icon="ic:baseline-file-download" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
            <Stack
              display="flex"
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
              sx={{ width: '100%', margin: '1% 0%' }}
            >
              <Typography variant="h6" color="GrayText" sx={{ width: 'fit-content' }}>
                Current Status
              </Typography>
              {steps.indexOf(status) > steps.indexOf('entity extraction') && (
                <Tooltip title="View entities">
                  <IconButton onClick={() => navigate('/dashboard/entity-viewer')}>
                    <Iconify color="primary.main" icon="ic:baseline-remove-red-eye" />
                  </IconButton>
                </Tooltip>
              )}
              {steps.indexOf(status) > steps.indexOf('cv upload') && (
                <Tooltip title="Download">
                  <IconButton onClick={() => console.log('file downloading')}>
                    <Iconify color="primary.main" icon="ic:baseline-file-download" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            <Box sx={{ width: '100%', paddingBottom: '3%', paddingTop: '1%' }}>
              <Stepper alternativeLabel>
                {steps.map((step, index) => {
                  const activeStep = steps.indexOf(status);
                  return (
                    <Tooltip key={step} title={step}>
                      <Step
                        active={activeStep === index}
                        completed={activeStep === steps.length - 1 ? true : index < activeStep}
                        // sx={{ color: 'red' }}
                      >
                        <StepLabel>{/* {activeStep === index ? step : ''} */}</StepLabel>
                      </Step>
                    </Tooltip>
                  );
                })}
              </Stepper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_cv) => _cv.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CvList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // API's
  // CV List
  const { data: cvList, isLoading: cvListLoading, isError: cvListError } = GetCvList();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cvList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cvList.length) : 0;

  let filteredCvList = null;
  let isCvListNotFound = false;
  if (cvList) {
    filteredCvList = applySortFilter(cvList, getComparator(order, orderBy), filterName);

    isCvListNotFound = filteredCvList.length === 0;
  }

  return (
    <Page title="CV List | Aardvark">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            CV List
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              // navigate('/dashboard/cv-upload');
              console.log(GetCvList2());
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Upload
          </Button>
        </Stack>

        {cvList && (
          <Card>
            <CvListToolbar
              numSelected={selected.length}
              filterName={filterName}
              rowCount={cvList.length}
              onFilterName={handleFilterByName}
              onSelectAllClick={handleSelectAllClick}
            />

            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableBody>
                    {filteredCvList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, name, status } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <Row
                            key={id + name}
                            isItemSelected={isItemSelected}
                            id={id}
                            name={name}
                            status={status}
                            handleClick={handleClick}
                          />
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isCvListNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={cvList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}
