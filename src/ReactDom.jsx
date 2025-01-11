import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Payment from './Payment';


export default function ReactDom() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<App />}/>
          <Route path="/checkout/:id" element={<Payment />}/>
      </Routes>
    </Router>
  )
}
