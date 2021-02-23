package main

import (
	"encoding/json"
	"fmt"
	// "strconv"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/hyperledger/fabric/common/flogging"

)

type SmartContract struct {
}

type StatePatient struct {
	Oximeter  string `json:"oximeter"`
	Bpm string `json:"bpm"`	
	Temperature string `json:"temperature"`
	Ecg string `json:"ecg"`
	BloodPressure string `json:"bloodPressure"`
}


func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

var logger = flogging.MustGetLogger("fabcar_cc")

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()

	if function == "queryStatePatient" {
		return s.queryStatePatient(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createStatePatient" {
		return s.createStatePatient(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryStatePatient(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	statePatientAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(statePatientAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	statePatient := []StatePatient{
		StatePatient{Oximeter: "80", Bpm: "65", Temperature: "36", Ecg: "12", BloodPressure: "122"},
	}

	i := 0
	for i < len(statePatient) {
		statePatientAsBytes, _ := json.Marshal(statePatient[i])
		APIstub.PutState("211.111.111-11", statePatientAsBytes)
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) createStatePatient(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 6")
	}

	var statePatient = StatePatient{Oximeter: args[1], Bpm: args[2], Temperature: args[3], Ecg: args[4], BloodPressure: args[5]}

	statePatientAsBytes, _ := json.Marshal(statePatient)
	APIstub.PutState(args[0], statePatientAsBytes)

	return shim.Success(statePatientAsBytes)
}


func main() {

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}

