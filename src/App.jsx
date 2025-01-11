import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './App.scss'

export default function App() {
  const apiURL = "https://mercadopago-api-pix.vercel.app/api/catalogKabum";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=> {
      if (products.length < 1){
        getCatalog();
      } else {
        setLoading(false);
      }
    }, [products])
    

  const getCatalog = async () => {
    try{
      const response = await fetch(`${apiURL}`);
      if (response.ok){
        const data = await response.json();
        const products = data.response.familia.produtos;
        setProducts(products);
      }
    }catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div className='main-container'>
        {products.map(x => {
          const { codigo, preco_desconto, nome } = x;
          const details = [codigo, preco_desconto, nome, x.foto ];
          const parcelas = 10;
          const price = x.preco_desconto;
          const priceParcelado = price/parcelas;
          const floor = Math.floor(priceParcelado * 100) / 100;
          return(
            <div id='product-main-box' key={x.codigo}>
              <div id='avaliacao'>
                <p>Avaliação: {x.avaliacao_nota}</p>
              </div>
              <div id='img-box'>
                <img src={x.foto} alt="Foto do produto" />
              </div>
              <div id='text'>
                <h2>{x.nome}</h2>
                <div id='price'>
                  <div id='old-price'><span>R$ </span><span>{x.preco_antigo}</span></div>
                  <div id='new-price'><span>R$ </span> <span> {x.preco_desconto.toFixed(2)}</span></div>
                  <div id="price-text"><span>À vista no PIX <br /> <span>ou ate <span style={{fontWeight: '800', color: 'rgb(99, 98, 98)'}}>{parcelas}x de {floor.toFixed(2)}</span></span></span></div>
                </div>
              </div>
              <Link to={`/checkout/${x.codigo}`} state={{details}} id='checkout-button'>
                <button onClick={() => getDetails(details)} >Comprar</button>
              </Link>
            </div>
          )
        })}
      </div>
    )}
    </>
  )
}
