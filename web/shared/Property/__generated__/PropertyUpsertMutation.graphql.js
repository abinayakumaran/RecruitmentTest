/**
 * @flow
 * @relayHash 8c23ce30892fcd9cfb2704d7901a348f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpsertPropertyInput = {
  property: PropertyInput,
  clientMutationId?: ?string,
};
export type PropertyInput = {
  id?: ?string,
  numberOfRooms?: ?number,
  livingSurface?: ?number,
  landSurface?: ?number,
  numberOfParkings?: ?number,
};
export type PropertyUpsertMutationVariables = {|
  input: UpsertPropertyInput
|};
export type PropertyUpsertMutationResponse = {|
  +upsertProperty: ?{|
    +property: ?{|
      +id: string,
      +numberOfRooms: ?number,
      +livingSurface: ?number,
      +landSurface: ?number,
      +numberOfParkings: ?number,
    |}
  |}
|};
export type PropertyUpsertMutation = {|
  variables: PropertyUpsertMutationVariables,
  response: PropertyUpsertMutationResponse,
|};
*/


/*
mutation PropertyUpsertMutation(
  $input: UpsertPropertyInput!
) {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpsertPropertyInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "upsertProperty",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "UpsertPropertyInput!"
      }
    ],
    "concreteType": "UpsertPropertyPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "property",
        "storageKey": null,
        "args": null,
        "concreteType": "Property",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "numberOfRooms",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "livingSurface",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "landSurface",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "numberOfParkings",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "PropertyUpsertMutation",
  "id": null,
  "text": "mutation PropertyUpsertMutation(\n  $input: UpsertPropertyInput!\n) {\n  upsertProperty(input: $input) {\n    property {\n      id\n      numberOfRooms\n      livingSurface\n      landSurface\n      numberOfParkings\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PropertyUpsertMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "PropertyUpsertMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7452fcddd21ca4c5f6984494d01a0df9';
module.exports = node;
