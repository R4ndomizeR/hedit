/* Vehicle Handling Editor (v1.0)
 * _dusieq#0404, Enerv#6489 (Discord)
 * GPLv2 / MIT License
 */

import * as alt from 'alt';
import * as native from 'natives';

let loaded = false;
let opened = false;

const view = new alt.WebView('http://resource/html/index.html');

const properties = [
    'mass',
    'initialDragCoeff',
    'percentSubmerged',
    'centreOfMassOffset',
    'inertiaMultiplier',
    'driveBiasFront',
    'initialDriveGears',
    'initialDriveForce',
    'driveInertia',
    'clutchChangeRateScaleUpShift',
    'clutchChangeRateScaleDownShift',
    'initialDriveMaxFlatVel',
    'breakForce',
    'brakeBiasFront',
    'handBrakeForce',
    'steeringLock',
    'tractionCurveMax',
    'tractionCurveMin',
    'tractionCurveLateral',
    'tractionSpringDeltaMax',
    'lowSpeedTractionLossMult',
    'camberStiffnesss',
    'tractionBiasFront',
    'tractionLossMult',
    'suspensionForce',
    'suspensionCompDamp',
    'suspensionReboundDamp',
    'suspensionUpperLimit',
    'suspensionLowerLimit',
    'suspensionRaise',
    'suspensionBiasFront',
    'antiRollBarForce',
    'antiRollBarBiasFront',
    'rollCentreHeightFront',
    'rollCentreHeightRear',
    'collisionDamageMult',
    'weaponDamageMult',
    'deformationDamageMult',
    'engineDamageMult',
    'petrolTankVolume',
    'oilVolume',
    'seatOffsetDistX',
    'seatOffsetDistY',
    'seatOffsetDistZ',
    'monetaryValue',
    'modelFlags',
    'handlingFlags',
    'damageFlags'
];

function notify(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}

function menu(toggle) {
    if (toggle) {
        const vehicle = alt.Player.local.vehicle;
        if (!vehicle) return notify('You are not in the vehicle!');

        const handling = alt.HandlingData.getForHandlingName(vehicle.model);
        if (!handling) return notify('Handling for model not available!');

        let data = {};

        for (const key in properties) {
            const property = properties[key];

            if (property === 'centreOfMassOffset' || property === 'inertiaMultiplier') {
                const value = handling[property];
                data[property] = [
                    parseFloat(value.x).toFixed(6),
                    parseFloat(value.x).toFixed(6),
                    parseFloat(value.x).toFixed(6),
                ];
            } else if (property === 'initialDriveGears' || property === 'modelFlags' || property === 'monetaryValue' || property === 'modelFlags' || property === 'handlingFlags' || property === 'damageFlags') {
                data[property] = parseInt(handling[property]);
            } else {
                data[property] = parseFloat(handling[property]).toFixed(6);
            }
        }

        view.focus();
        view.emit('menu', toggle, JSON.stringify(data));
    } else {
        view.unfocus();
        view.emit('menu', toggle);
    }

    opened = toggle;

    alt.showCursor(toggle);
    alt.toggleGameControls(!toggle);
}

function promisify(callback) {
    return new Promise((resolve, reject) => {
        let loader = alt.setInterval(() => {
            if (callback() == true) {
                resolve(true);
                alt.clearInterval(loader);
            }
        }, 200);
    });
}

view.on('ready', () => {
    loaded = true;
});

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('execute', (property, value) => {
    const vehicle = alt.Player.local.vehicle;
    if (!vehicle) return notify('You are not in the vehicle!');

    if (property === 'centreOfMassOffset' || property === 'inertiaMultiplier') {
        value = JSON.parse(value);
    }

    const handling = alt.HandlingData.getForHandlingName(vehicle.model);
    handling[property] = value;

    notify('Handling for model changed.');
    alt.emitServer('playerRespawnVehicle', vehicle);
});

alt.on('keyup', (key) => {
    if (!loaded) return;

    if (key === 0x75) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

alt.onServer('setPedIntoVehicle', async (vehicle) => {
    const player = alt.Player.local;
    await promisify(() => {
        if (player.vehicle) return true;
        native.setPedIntoVehicle(player.scriptID, vehicle.scriptID, -1);
    });
});
