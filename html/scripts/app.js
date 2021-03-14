/* Vehicle Handling Editor (v1.0)
 * _dusieq#0404, Enerv#6489 (Discord)
 * GPLv2 / MIT License
 */

let app = new Vue({
    el: '#app',
    data: {
        properties: {
            'mass': 0,
            'initialDragCoeff': 0,
            'percentSubmerged': 0,
            'centreOfMassOffset': [0, 0, 0],
            'inertiaMultiplier': [0, 0, 0],
            'driveBiasFront': 0,
            'initialDriveGears': 0,
            'initialDriveForce': 0,
            'driveInertia': 0,
            'clutchChangeRateScaleUpShift': 0,
            'clutchChangeRateScaleDownShift': 0,
            'initialDriveMaxFlatVel': 0,
            'breakForce': 0,
            'brakeBiasFront': 0,
            'handBrakeForce': 0,
            'steeringLock': 0,
            'tractionCurveMax': 0,
            'tractionCurveMin': 0,
            'tractionCurveLateral': 0,
            'tractionSpringDeltaMax': 0,
            'lowSpeedTractionLossMult': 0,
            'camberStiffnesss': 0,
            'tractionBiasFront': 0,
            'tractionLossMult': 0,
            'suspensionForce': 0,
            'suspensionCompDamp': 0,
            'suspensionReboundDamp': 0,
            'suspensionUpperLimit': 0,
            'suspensionLowerLimit': 0,
            'suspensionRaise': 0,
            'suspensionBiasFront': 0,
            'antiRollBarForce': 0,
            'antiRollBarBiasFront': 0,
            'rollCentreHeightFront': 0,
            'rollCentreHeightRear': 0,
            'collisionDamageMult': 0,
            'weaponDamageMult': 0,
            'deformationDamageMult': 0,
            'engineDamageMult': 0,
            'petrolTankVolume': 0,
            'oilVolume': 0,
            'seatOffsetDistX': 0,
            'seatOffsetDistY': 0,
            'seatOffsetDistZ': 0,
            'monetaryValue': 0,
            'modelFlags': 0,
            'handlingFlags': 0,
            'damageFlags': 0
        },
        visible: false
    },
    methods: {
        emit(property, value) {
            if (property === 'centreOfMassOffset' || property === 'inertiaMultiplier') {
                const vector = this.properties[property];
                alt.emit('execute', property,
                    JSON.stringify({
                        x: parseFloat(vector[0]),
                        y: parseFloat(vector[1]),
                        z: parseFloat(vector[2])
                    }));
            } else {
                alt.emit('execute', property, parseFloat(value));
            }
        },
        close() {
            this.visible = false;
        }
    }
});