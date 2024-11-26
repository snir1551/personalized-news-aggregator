
import axios from 'axios';

const DAPR_PORT = 3500;
const STATE_STORE_NAME = "statestore";
const STATE_URL = `http://dapr:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`;


export const saveToStateStore = async (myKey, myValue) => {
  try {
    const state = [{ key: myKey, value: myValue }];
    await axios.post(STATE_URL, state);
  } catch (error) {
    console.error('Error saving to Dapr state store:', error.message);
    throw new Error('Error saving to Dapr state store');
  }
};


export const getFromStateStore = async (key) => {
  try {
    const response = await axios.get(`${STATE_URL}/${key}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving from Dapr state store:', error.message);
    throw new Error('Error retrieving from Dapr state store');
  }
};