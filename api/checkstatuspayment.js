import { Payment, MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config({ path: './key.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
const payment = new Payment(client);

export default async (req, res) => {
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
};