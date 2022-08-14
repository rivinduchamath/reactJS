import React from 'react';
import { Table } from '@mui/material';
import * as PropTypes from 'prop-types';

function NameListItem(props) {
  return null;
}

NameListItem.propTypes = {
  city: PropTypes.shape({ city: PropTypes.string }),
  name: PropTypes.shape({ address: PropTypes.string, title: PropTypes.string })
};

function App() {
  const nameList = {
    name: {
      title: 'name',
      address: 'galle'
    },
    location: {
      city: 'dsds'
    }
  };
  return (
    <Table>
      <h1>Users Table</h1>
      <NameListItem name={nameList.name} city={nameList.location} />
    </Table>
  );
}
