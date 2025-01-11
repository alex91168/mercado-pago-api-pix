import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import Pix from './pagamento/Pix'
import Cc from './pagamento/Cc'
import './payment.scss'
import PagamentoProduto from './componentes/PagamentoProduto';
import Aprovado from './componentes/Aprovado';
import Pendente from './componentes/Pendente';

export default function Payment() {
  const details = useLocation();
  const getDetails = details.state?.details;
  const [methodPay, setMethodPay] = useState('');
  const [page, setPage] = useState(0);
  const [CodePixCopy, setCodePixCopy] = useState('');
  const [pixLink, setPixLink] = useState('');
  const [popUpCopy, setPopUpCopy] = useState(false);
  const apiURL = "https://mercadopago-api-pix.vercel.app/api/checkstatuspayment";

  const getMethod = (value) => {
    if (methodPay === value) {
      setMethodPay(0);
      setPage(1);
    } else {
      setMethodPay(value);
      setPage(2);
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(CodePixCopy);
    setPopUpCopy(true);
  }
  
  useEffect(() => {
    setTimeout(() => {
      setPopUpCopy(false);
    }, 500);
  }, [popUpCopy])
  
  const novaAba = () => {
    window.open(pixLink, '_blank');
  }

  const checkStatusFunc = (idPayment) => {
      checkId(idPayment);
  }

  let timer;
  const checkId = (idPayment) => {
      timer = setInterval(() => {
          checkStatus(idPayment);
      }, 5000);
      () => clearInterval(timer);
  }
  const [statusMessage, setStatusMessage] = useState('');
  const checkStatus = async (idPayment) => {
      const response = await fetch(`${apiURL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPayment: idPayment
          })
      });
      const data = await response.json();
      console.log('Response status pay:' , response)
      console.log('Data', data)
      if (data.message === 'Pendente') {
        setStatusMessage('pendente');
      } 
      if (data.message === 'Aprovado') {
        setStatusMessage('aprovado');
        clearInterval(timer);
      }
  }

  return (
    <div id='main-container-payment'>
      <div id='payment-geral'>
        {page === 0 && 
        <>
        <div className='payment-box left'>
          <div className='payment-produto-box page0-product'>
            <div id='payment-produto-img'>
              <img src={getDetails[3]} alt={getDetails[2]} />
            </div>
            <div id='payment-divisor'></div>
            <div id='payment-produto-info'>
              <h3>{getDetails[2]}</h3>
              <div>
                <span>Valor:</span>
                <p>R$ {getDetails[1].toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='payment-box right'>
          <div id='details-checkout'>
              <span style={{paddingBottom:'10px'}}><span style={{fontWeight:'bold'}}>Produto:</span> {getDetails[2]} </span>
              <span><span style={{fontWeight:'bold'}}>Valor:</span> R$ {getDetails[1].toFixed(2)}</span>
              <span><span style={{fontWeight:'bold'}}>Valor Taxa:</span> R$ 0.00</span>
              <span><span style={{fontWeight:'bold'}}>Valor Frete:</span> R$ 0.00</span>
              <div id='valor-total'>
                <span>Valor total: R$ {getDetails[1].toFixed(2)}</span>
              </div>
              <div className='payment-btn-box'>
                <button onClick={() => setPage(1)} className='payment-btn continue'>Continuar</button>
              </div>
          </div>
        </div>
        </>}

        {page === 1 && 
        <>
        <div className='payment-box left-pg1'>
          <div id='title-method'>
            <h2>Escolha o metodo de pagamento</h2>
          </div>
          <div id='payment-method'>
            <div className='method pix'>
              <input type="checkbox" onChange={() => getMethod(1)} checked={methodPay === 1}/>Pix
            </div>
            {/**
            <div className='method cc'>
              <input type='checkbox' onChange={() => getMethod(2)} checked={methodPay === 2}/>Cartão de crédito
            </div>
             */}
          </div>
        </div>
        <div className='payment-box right'>
          <PagamentoProduto getDetails={getDetails} />
        </div>
        </>}
        
        {page === 2 && 
        <>
        <div className='payment-box left-pg1'>
          <div id='bread' onClick={() => {setPage(1); setMethodPay('')}}>
            <span>Voltar</span>
            </div>
          <div id='title-method'>
            <h2>Digite seus dados</h2>
          </div>
          <div id='user-infos'>
            {methodPay === 1 ? 
            <Pix 
              product={getDetails} 
              setPage={setPage} 
              setCodePixCopy={setCodePixCopy} 
              setPixLink={setPixLink}
              
              checkStatusFunc={checkStatusFunc}/>
               : null}
            {methodPay === 2 ? <Cc product={getDetails}/> : null}
            <button onClick={() => checkId()}>TESTE</button>
          </div>
        </div>
        <div className='payment-box right'>
          <PagamentoProduto getDetails={getDetails} />
        </div>
        </>}
        
        {page === 3 && 
        <>
        <div className='payment-box left-pg1'>
          <div id='title-method'>
            <h2>Seu link de pagamento foi gerado!</h2>
          </div>
          {CodePixCopy && 
            <div id='qr-code'>
              <QRCodeCanvas value={CodePixCopy} size={256} version={10} level={"L"}></QRCodeCanvas>
              <div id='code-pix'>
                <input type="text" value={CodePixCopy} readOnly="" />
                <button id='btn-copy' onClick={copyCode}>
                  Copiar codigo
                </button>
                <span id='copiado' className={popUpCopy ? 'active' : ''}>Copiado!</span>
              </div>
              <div id='linkpix' onClick={novaAba}>Link de pagamento</div>
            </div>
          }
        </div>
        <div className='payment-box right'>
        {CodePixCopy && (
          statusMessage === 'aprovado' ? (
            <Aprovado />
          ) : (
            (statusMessage === '' || statusMessage === 'pendente') && <Pendente />
          )
        )}
        </div>
        </>}
      </div>
    </div>
  )
}
