import fetch from 'node-fetch';

export default async (req, res) => {
    const response = await fetch('https://servicespub.prod.api.aws.grupokabum.com.br/descricao/v1/descricao/familia/521362', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res.status(200).json({response: await response.json()});
};