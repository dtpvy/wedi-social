import ImageKit from 'imagekit';
import { NextApiRequest, NextApiResponse } from 'next';

const imagekit = new ImageKit({
  publicKey: 'public_xTbc2crb6gXYxB5gtKroms4tWCU=',
  privateKey: 'private_Qr0rq1pwvFbopF819AptlFr6fX8=',
  urlEndpoint: 'https://ik.imagekit.io/0o9nfg6a3',
});

const image = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const date = new Date();
    const token = req.query.token;
    const expiration = +date / 1000 + 60 * 30; // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(token as any, expiration);

    res.status(200).send(signatureObj);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

export default image;
