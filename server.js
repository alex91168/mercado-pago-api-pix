import express from 'express';
import fetch from 'node-fetch';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config({ path: './key.env' });
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/catalogKabum', async (req, res) => {
    const response = await fetch('https://servicespub.prod.api.aws.grupokabum.com.br/descricao/v1/descricao/familia/521362', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res.status(200).json({response: await response.json()});
});

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
const payment = new Payment(client);

app.post('/pix', async (req, res) => {
    const { name, produto_id, description, email, transaction_amount } = req.body;
    if (!name || !email ){
        console.log('dadosInsuficiente');
        return res.status(401).json({ error: 'Dados insuficientes' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.log('emailInvalido');
        return res.status(402).json({ error: 'Email inválido' });
    }
    const idempotencyKey = uuidv4();
    const details = {
        transaction_amount: Number(transaction_amount),
        payment_method_id: 'pix',
        description: `Comprado do produto: ${description}`,
        payer: {
            email: email,
        },
    }
    const result = await payment.create({ body: details, requestOptions: { idempotencyKey: idempotencyKey }})
    return res.status(200).json({
        id: result.id,
        qr_code: result.point_of_interaction.transaction_data.qr_code ,
        ticket_url: result.point_of_interaction.transaction_data.ticket_url,
    });
});

app.post('/checkstatuspayment', async (req, res) => {
    const { idPayment } = req.body;
    const result = await payment.get({id: idPayment});
    const details = result.status;
    try {
        if (!idPayment){
            return res.status(400).json({ error: 'Dados insuficientes' });
        }
        if(details === 'pending'){
            return res.status(200).json({ message: 'Pendente'});
        }
    
        if (details === 'approved') {
            return res.status(200).json({ message: 'Aprovado' });
        }
    
        if (details === 'authorized') {
            return res.status(200).json({ message: 'Aprovado' });
        }

        return res.status(400).json({ message: 'Não foi possivel achar o pagamento' });
    } catch (err) {
        console.log('Erro ao verificar ID', err);
    }
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});

