import { Payment, MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config({ path: './key.env' });
import { v4 as uuidv4 } from 'uuid';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
const payment = new Payment(client);

export default async (req, res) => {
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
};