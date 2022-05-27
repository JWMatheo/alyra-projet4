//import client from '../../lib/sanity';

/*====== export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const data = await JSON.parse(req.body);

      try {
        await client
          .create({
            _type: 'otaku',
            ipfs: data.ipfs,
          })
          .then((res) => {
            console.log(`Todo was created, document ID is ${res._id}`);
          });

        res.status(200).json({ msg: `Todo was created, document ID is ${res._id}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error, check console' });
      }
      break;

    case 'GET':
      await client.fetch(`*[ _type == "nfts"]`).then((res) => res.status(200).json(res));
    case 'GET':
      await client.fetch(`*[ _type == "nfts"]`).then((res) => res.status(200).json(res));

  }
}
 =======*/