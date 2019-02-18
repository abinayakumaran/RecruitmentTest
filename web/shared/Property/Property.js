/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from '../../controls/link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      numberOfRooms
      livingSurface
      landSurface
      numberOfParkings
    }
  `
);

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        numberOfRooms
        livingSurface
        landSurface
        numberOfParkings
      }
    }
  }
`);

type Props = {|
  ...FragmentRefs < PropertyData >,
  step ?: string,
|};

export default class Property extends React.Component<Props> {
  state = {
    property: {
      livingSurface: 0.0,
      numberOfRooms: 0.0,
      landSurface: 0.0,
      numberOfParkings: 0
    },
    loading: false,
    errMsg: ''
  };

  handleChange = name => event => {
    let property = this.state.property
    property[name] = event.target.value,

      this.setState({
        property
      });
  };

  upsertProperty = async (PropertyUpsertMutation) => {
    this.setState({ loading: true, errMsg: '' })
    await PropertyUpsertMutation.mutate({ property: this.state.property }, this.onComplete, this.onError)
  }

  onComplete = (res) => {
    Router.push('/properties')
    this.setState({ loading: false })
  }

  onError = (err) => {
    let property = {
      livingSurface: 0.0,
      numberOfRooms: 0.0,
      landSurface: 0.0,
      numberOfParkings: 0
    }
    this.setState({ errMsg: "Invalid Property Details", loading: false, property: property })
  }

  render() {
    const { property, loading, errMsg } = this.state;
    return (
      <>
        <PropertyFragment property={this.props.property}>
          {(/* use { property } to get the query data*/) => (
            <Flex justifyContent="center">

              <Paper
                css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
              >
                {!loading ?
                  <>
                    <Typography variant="h6">Property</Typography>
                    <form noValidate autoComplete="off">
                      <TextField
                        id="filled-name"
                        label="Number of Rooms"
                        style={{ margin: 15 }}
                        value={property.numberOfRooms}
                        onChange={this.handleChange('numberOfRooms')}
                        margin="normal"
                        variant="filled"
                        type="number"
                      />
                      <TextField
                        id="filled-name"
                        style={{ margin: 15 }}
                        label="Living Surface"
                        value={property.livingSurface}
                        onChange={this.handleChange('livingSurface')}
                        margin="normal"
                        type="number"
                        variant="filled"
                      />
                      <TextField
                        id="filled-name"
                        style={{ margin: 15 }}
                        label="Land Surface"
                        value={property.landSurface}
                        onChange={this.handleChange('landSurface')}
                        margin="normal"
                        type="number"
                        variant="filled"
                      />
                      <TextField
                        id="filled-name"
                        style={{ margin: 15 }}
                        label="Number of Parkings"
                        value={property.numberOfParkings}
                        onChange={this.handleChange('numberOfParkings')}
                        margin="normal"
                        type="number"
                        variant="filled"
                      />
                    </form>
                    <span style={{ color: 'red' }}>{errMsg}</span>
                    <Flex justifyContent="space-around">
                      <PropertyUpsertLead>
                        {PropertyUpsertMutation => {
                          return (
                            <>
                              <Button
                                onClick={async () => { this.upsertProperty(PropertyUpsertMutation) }}
                                color="primary"
                                variant="contained"
                                css={{ marginTop: 80 }}
                              >
                                SUBMIT
                        </Button>
                            </>
                          )
                        }}
                      </PropertyUpsertLead>
                      <Link href={{ pathname: '/properties' }}>
                        <Button
                          to="/properties"
                          color="primary"
                          variant="contained"
                          css={{ marginTop: 80 }}
                        >
                          Back to properties
                      </Button>
                      </Link>
                    </Flex>
                  </>
                  :
                  <Flex justifyContent="center">
                    <CircularProgress color="primary" />
                  </Flex>
                }
              </Paper>

            </Flex>
          )}
        </PropertyFragment>
      </>
    );
  }
}

