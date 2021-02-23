'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');


const oximeter = ['60', '61', '62', '63', '64', '65', '66', '80', '85', '90'];
const bpm = ['65', '67', '69', '81', '89', '60', '61', '62', '93', '59'];
const temperature = ['36', '36', '37', '38', '39', '38', '36', '36', '37', '36'];
const ecg = ['12', '13', '14', '15', '16', '17', '18', '19', '13', '14'];
const bloodPressure = ['120', '121', '122', '123', '124', '125', '136', '137', '138', '139'];

/**
 * Workload module for the benchmark round.
 */
class CreateCarWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;
        let cpfNumber = 'CPF' + this.workerIndex + ' - ' + this.txIndex.toString();        
        let oximeterNumber = oximeter[Math.floor(Math.random() * oximeter.length)];
        let bpmNumber = bpm[Math.floor(Math.random() * bpm.length)];
        let temperatureNumber = temperature[Math.floor(Math.random() * temperature.length)];
        let ecgNumber = ecg[Math.floor(Math.random() * ecg.length)];
        let bloodPressureNumber = bloodPressure[Math.floor(Math.random() * bloodPressure.length)];

        let args = {
            contractId: 'fabcar',
            contractVersion: 'v1',
            contractFunction: 'createStatePatient',
            contractArguments: [cpfNumber, oximeterNumber, bpmNumber, temperatureNumber, ecgNumber, bloodPressureNumber],
            timeout: 90
        };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
