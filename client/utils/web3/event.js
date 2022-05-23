import { instanceContract } from './init';
import notification from '../notification';

export const mintNFT = async () => {
  const instance = await instanceContract();
  await instance.events
    .showToken()
    .on('data', async (event) => {
      const newStatus = event.returnValues;
      console.log(newStatus);
    })
    .on('error', (err) => notification('error', err));
};
