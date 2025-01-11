import React from 'react'

export default function PagamentoProduto({getDetails}) {
  return (
    <div className='payment-produto-box page1-product'>
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
  )
}
