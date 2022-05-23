import { createClient } from 'next-sanity';
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  apiVersion: '2021-04-28',
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_KEY,
  useCdn: false,
};
export const client = createClient(config);
