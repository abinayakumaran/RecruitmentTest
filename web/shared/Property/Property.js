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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export default class Property extends React.Component<Props> {
  state = {
    livingSurface: 0.0,
    numberOfRooms: 0.0,
    landSurface: 0.0,
    numberOfParkings: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  upsertProperty = async (PropertyUpsertMutation) => {
    await PropertyUpsertMutation.mutate({ property: this.state });
    setTimeout(() => Router.push('/properties'), 2000)
  }

  render() {
    return (
      <>
        <PropertyFragment property={this.props.property}>
          {(/* use { property } to get the query data*/) => (
            <Flex justifyContent="center">
              <Paper
                css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
              >
                <Typography variant="h6">Property</Typography>
                <form className={styles.container} noValidate autoComplete="off">
                  <TextField
                    id="filled-name"
                    label="Number of Rooms"
                    className={styles.textField}
                    value={this.state.numberOfRooms}
                    onChange={this.handleChange('numberOfRooms')}
                    margin="normal"
                    variant="filled"
                    type="number"
                  />
                  <TextField
                    id="filled-name"
                    label="Living Surface"
                    className={styles.textField}
                    value={this.state.livingSurface}
                    onChange={this.handleChange('livingSurface')}
                    margin="normal"
                    type="number"
                    variant="filled"
                  />
                  <TextField
                    id="filled-name"
                    label="Land Surface"
                    className={styles.textField}
                    value={this.state.landSurface}
                    onChange={this.handleChange('landSurface')}
                    margin="normal"
                    type="number"
                    variant="filled"
                  />
                  <TextField
                    id="filled-name"
                    label="Number of Parkings"
                    className={styles.textField}
                    value={this.state.numberOfParkings}
                    onChange={this.handleChange('numberOfParkings')}
                    margin="normal"
                    type="number"
                    variant="filled"
                  />
                </form>
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
              </Paper>
            </Flex>
          )}
        </PropertyFragment>
      </>
    );
  }
}

