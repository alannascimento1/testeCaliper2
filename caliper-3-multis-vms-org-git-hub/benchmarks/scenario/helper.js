/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

const oximeter = ['60', '61', '62', '63', '64', '65', '66', '80', '85', '90'];
const bpm = ['65', '67', '69', '81', '89', '60', '61', '62', '93', '59'];
const temperature = ['36', '36', '37', '38', '39', '38', '36', '36', '37', '36'];
const ecg = ['12', '13', '14', '15', '16', '17', '18', '19', '13', '14'];
const bloodPressure = ['120', '121', '122', '123', '124', '125', '136', '137', '138', '139'];

let carNumber;
let txIndex = 0;

module.exports.createCar = async function (bc, workerIndex, args) {

    while (txIndex < args.assets) {
        txIndex++;

        carNumber = 'CPF' + workerIndex + '-' + txIndex.toString();
        let oximeterNumber = oximeter[1];
        let bpmNumber = bpm[1];
	let temperatureNumber = temperature[1]; 
	let ecgNumber = ecg[1];
	let bloodPressureNumber = bloodPressure[1];

        let myArgs = {
            contractId: 'fabcar',
            contractVersion: 'v1',
            contractFunction: 'createStatePatient',
            contractArguments: [carNumber, oximeterNumber, bpmNumber, temperatureNumber, ecgNumber, bloodPressureNumber],
            timeout: 90
        };

        await bc.sendRequests(myArgs);
    }

};
