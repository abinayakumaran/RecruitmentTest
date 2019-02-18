/**
 * @flow
 * @relayHash d4693f6e395afa4fec91883f78e0165f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeletePropertyInput = {
  propertyId: string,
  clientMutationId?: ?string,
};
export type PropertiesDeleteMutationVariables = {|
  input: DeletePropertyInput
|};
export type PropertiesDeleteMutationResponse = {|
  +deleteProperty: ?{|
    +deletedPropertyId: ?string
  |}
|};
export type PropertiesDeleteMutation = {|
  variables: PropertiesDeleteMutationVariables,
  response: PropertiesDeleteMutationResponse,
|};
*/


/*
mutation PropertiesDeleteMutation(
  $input: DeletePropertyInput!
) {
  deleteProperty(input: $input) {
    deletedPropertyId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeletePropertyInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteProperty",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "DeletePropertyInput!"
      }
    ],
    "concreteType": "DeletePropertyPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "deletedPropertyId",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "PropertiesDeleteMutation",
  "id": null,
  "text": "mutation PropertiesDeleteMutation(\n  $input: DeletePropertyInput!\n) {\n  deleteProperty(input: $input) {\n    deletedPropertyId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PropertiesDeleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "PropertiesDeleteMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '54b23268168f10c26ad030ec6d23dd6b';
module.exports = node;
