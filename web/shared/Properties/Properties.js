/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Router from 'next/router'
import { Link } from '../../controls/link';
import { type FragmentRefs, createFragment, createMutation } from '../../controls/relay';
import type { Properties_root } from './__generated__/Properties_root.graphql';
import type { PropertiesDeleteMutation } from './__generated__/PropertyDeleteMutation.graphql';

type PropertiesData = {|
  root?: Properties_root,
|};

const PropertiesFragment = createFragment<PropertiesData>(
  graphql`
    fragment Properties_root on Query {
      properties {
        edges {
          node {
            id
            numberOfRooms
            livingSurface
            landSurface
            numberOfParkings
          }
        }
      }
    }
  `
);

const PropertiesDelete = createMutation<PropertiesDeleteMutation, {}>(graphql`
  mutation PropertiesDeleteMutation($input: DeletePropertyInput!) {
    deleteProperty(input: $input) {
      deletedPropertyId
    }
  }
`);

type Props = {|
  ...FragmentRefs < PropertyData >,
  step ?: string,
|};

export default class Properties extends React.Component {
  state = {
    loading: false,
    errMsg: ''
  }

  deleteProperty = async (PropertiesDeleteMutation, id) => {
    this.setState({ loading: true, errMsg: '' })
    await PropertiesDeleteMutation.mutate({ propertyId: id }, this.onComplete, this.onError)
  }


  onComplete = (res) => {
    Router.push('/properties')
    this.setState({ loading: false })
  }

  onError = (err) => {
    Router.push('/properties')
    this.setState({ errMsg: "Unable to Delete the Property", loading: false })
  }
  render() {
    const { loading, errMsg } = this.state;
    return (
      <>
        <PropertiesFragment root={this.props.root}>
          {({ root }) => (
            <Flex justifyContent="center">
              <Paper css={{ maxWidth: 960, marginTop: 16, width: '100%' }}>
                {!loading ?
                  <>
                    <Toolbar>
                      <Flex css={{ width: '100%' }}>
                        <Typography variant="h6">Properties</Typography>
                        <div css={{ flex: 1 }} />

                        <Link href={{ pathname: '/property' }}>
                          <Button to="/property" color="primary" variant="contained">
                            Add
                    </Button>
                        </Link>
                      </Flex>
                    </Toolbar>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {/* <TableCell>Name</TableCell> */}
                          <TableCell numeric>Number Of Rooms</TableCell>
                          <TableCell numeric>Living surface</TableCell>
                          <TableCell numeric>Land surface</TableCell>
                          <TableCell numeric>Number of parkings</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(root.properties.edges || []).map(({ node }) => {
                          return (
                            <TableRow key={node.id}>
                              {/* <TableCell scope="row">{node.name}</TableCell> */}
                              <TableCell numeric>{node.numberOfRooms}</TableCell>
                              <TableCell numeric>{node.livingSurface}</TableCell>
                              <TableCell numeric>{node.landSurface}</TableCell>
                              <TableCell numeric>{node.numberOfParkings}</TableCell>
                              <TableCell numeric>
                                <PropertiesDelete>
                                  {PropertiesDeleteMutation => {
                                    return (
                                      <>
                                        <Flex justifyContent="center">
                                          <DeleteIcon onClick={async () => { this.deleteProperty(PropertiesDeleteMutation, node.id) }} color="secondary" style={{ fontSize: 30, cursor: 'pointer' }} />
                                        </Flex>
                                      </>
                                    )
                                  }}
                                </PropertiesDelete>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <span style={{ color: 'red' }}>{errMsg}</span>
                  </>
                  :
                  <Flex justifyContent="center">
                    <CircularProgress color="primary" />
                  </Flex>
                }
              </Paper>

            </Flex>
          )}
        </PropertiesFragment>
      </>
    );
  };
}
