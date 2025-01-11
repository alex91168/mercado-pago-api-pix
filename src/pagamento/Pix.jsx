import React, {useState} from 'react'
import '../payment.scss';

export default function Pix({product, setCodePixCopy, setPixLink, setPage, checkStatusFunc}) {
    const apiURL = "https://mercadopago-api-pix.vercel.app/api/pix";
    const [userDetails, setUserDetails ] = useState({ name: '', email: '', cpf: '123.456.789-00'});

    const eventValue = (e) => {
        setUserDetails({...userDetails, [e.target.name]: e.target.value})
    }
    const paymentPix = async () => {
        const response = await fetch(`${apiURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userDetails.name,
                produto_id: product[0],
                description: product[2],
                email: userDetails.email,
                transaction_amount: Number(product[1]) ,
            })
        })
        if(response.status === 401){
            if(userDetails.name.length < 1 || userDetails.email.length < 1){
                alert('Preencha todos os campos');
            } else if (response.status === 402) {
                alert('Insira um email valido');
            }
        } else {
            const data = await response.json();
            setCodePixCopy(data.qr_code);
            setPixLink(data.ticket_url);
            setPage(3);
            checkStatusFunc(data.id);
        }
    }
    
    
  return (  
<>
    <div className='input-user pix'>
        <div>
            <span>Nome:</span>
            <input type="text" placeholder='Nome' onChange={eventValue} name='name' />
        </div>
        <div id='input-user-email-cpf'>
            <div className='input-user-2 email'>
                <span>Email:</span>
                <input type="text" placeholder='Email' onChange={eventValue} name='email'/>
            </div>
            <div className='input-user-2 cpf'>
                <span>CPF:</span>
                <input type="text" placeholder='CPF' onChange={eventValue} name='cpf' value='548.945.430-01'/>
            </div>
        </div>
    </div>
    <div id='btn-confirm'>
        <button onClick={paymentPix}>Criar pedido</button>
    </div>
</>
  )
}
