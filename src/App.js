// import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import MainTable from './components/MainTable/MainTable';
import SumTotal from './components/SumTotal/SumTotal';
import ProductsData from './utils/productsData';

function App() {
  const [productsList, setProductsList] = useState([]);
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  return (
    <div className="App">
      <div className='innerBackground'>
        <h1>☕ קפה משה ☕</h1>
        <MainTable
          ProductsData={ProductsData}
          productsList={productsList}
          setProductsList={setProductsList}
          isEditDisabled={isEditDisabled}
          setIsEditDisabled={setIsEditDisabled}
        />
        <SumTotal productsList={productsList}/>
        {/* <button onClick={()=>ProductsData.updateAllItems([])}>reset list</button> */}
      </div>
    </div>
  );
}

export default App;
