/* Vehicle Handling Editor (v1.0)
 * _dusieq#0404, Enerv#6489 (Discord)
 * GPLv2 / MIT License
 */

import * as alt from 'alt';

alt.onClient('playerRespawnVehicle', (player, entity) => {
    if (!entity) return;

    let vehicle = new alt.Vehicle(entity.model, entity.pos.x, entity.pos.y, entity.pos.z, entity.rot.x, entity.rot.y, entity.rot.z);
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);

    entity.destroy();
});