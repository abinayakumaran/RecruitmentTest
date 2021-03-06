"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;


async function _default(input, ctx) {
  const property = { ...input };

  const data = await ctx.validate(property)((p) =>
  p.
  field('id').
  fromGlobalId('Property').
  field('numberOfRooms', { as: 'number_of_rooms' }).
  field('livingSurface', { as: 'living_surface' }).
  field('landSurface', { as: 'land_surface' }).
  field('numberOfParkings', { as: 'number_of_parkings' }));


  return data;
}
//# sourceMappingURL=validate.js.map
