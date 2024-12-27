import React, {useState, useEffect} from 'react';
import MsgBox from '../MsgBox/MsgBox';
import PasswordBox from '../PasswordBox/PasswordBox';

const MainTable = ({
    productsList,
    setProductsList,
    ProductsData,
    isEditDisabled,
    setIsEditDisabled
    }) => {
    const [loading, setLoading] = useState(true);
    const [mypassword, setMypassword] = useState();
    const [mypasswordHide, setMypasswordHide] = useState(true);
    const [msgText, setMsgText] = useState(null);

    useEffect(()=>{
      async function getData(){
        try {
          const products = await ProductsData.getAllItems();
          setProductsList(products);
          //add amount property to products:
          setProductsList(prevList =>
            prevList.map(product => ({ ...product, amount: null}))
          );
        }catch(error){
          console.error("Error fetching data:", error);
        }finally {
          setLoading(false); 
        }
      }
      getData();
      console.log('fetching only once');
    },[ProductsData,setProductsList])

    const handleValueChange = (id, property, newValue) => {
        setProductsList(prevList => 
            prevList.map(product =>
                product.id === id ? { ...product, [property]: newValue} : product
            )
        );
    };
    const toggleHidePass = () => {
        setMypasswordHide(!mypasswordHide);
        setMypassword('');
    }
    const handleSave = () => {
        resetIDs();
        ProductsData.updateAllItems(productsList);
        toggleDisabled();
        showMessage("נשמר!");
    };
    const handlePassChange = (val) => {
        setMypassword(val)
    };
    const handlePasswordCheck = () => {
        toggleHidePass();
        if (mypassword === 'arznim') {
            toggleDisabled();
            showMessage("סיסמא נכונה");
        } else {
            showMessage("סיסמא שגויה, נסה שוב");
        }
    };
    const showMessage = (text, duration = 3000) => {
        setMsgText(text);
        const timeoutId = setTimeout(() => {setMsgText(null)},duration);
        return () => clearTimeout(timeoutId);
    }
    const toggleDisabled = () => {
        setIsEditDisabled(!isEditDisabled)
    };
    const handleAddProduct = () => {
        resetIDs();
         setProductsList(prevList => [
            ...prevList,
            {id:prevList.length + 1 , item: '', price: ''}
        ])
    };
    const handleRemoveProduct = (removeID) => {
        setProductsList(prevList => prevList.filter(product => product.id !== removeID));
        resetIDs();

   };
   const resetIDs = () => {
    setProductsList(prevList =>
        prevList.map((product,i) =>
            ({...product, id:i})))
   }

    if (loading) {
      return (
        <div id='mainTable'>
            <h2>טוען נתונים...</h2>
        </div>
      )
    }

    return (
        <>
        <MsgBox className="msg-box" msgText={msgText} />
        <div id='mainTable'>
            {isEditDisabled ? 
               (<div className='btn' onClick={toggleHidePass}>🔓 פתח</div>) :
               (<div className='btn' onClick={handleSave}>💾 שמור</div>)
            
            }
            {!mypasswordHide &&
                <PasswordBox
                    mypassword={mypassword}
                    handlePassChange={handlePassChange}
                    handlePasswordCheck={handlePasswordCheck}
                />
            }
            
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th id='testet'>פריט</th>
                        <th>מחיר</th>
                        <th>כמות</th>
                    </tr>
                </thead>
                <tbody>

                {/* brake down productsList */}
                {productsList.map((product,i)=>(
                    <tr key={product.id}>
                        
                        {isEditDisabled ?
                            <td className='productID'>{i+1})</td> :
                            <button className='removeProduct' onClick={()=>handleRemoveProduct(product.id)}>X</button>
                        }

                        <td>
                            <input
                                id={product.id + "_item"}
                                type='text'
                                value={product.item}
                                disabled={isEditDisabled}
                                onChange={e => handleValueChange(product.id, 'item', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type='number'
                                value={product.price}
                                disabled={isEditDisabled}
                                onChange={e => handleValueChange(product.id, 'price', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type='number'
                                value={product.amount}
                                disabled={!isEditDisabled}
                                onChange={e => handleValueChange(product.id, 'amount', e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <button disabled={isEditDisabled} onClick={()=>handleAddProduct()}>+</button>
                </tr>

                {/* allways keep another line */}
                {/* <p>{document.getElementById("testet").innerHTML.length}</p> */}
                {/* {productsList.length === 0 ? (
                    <tr key={productsList.length + 1}>
                    <td className='productID'>
                        {productsList.length+1})
                    </td>
                    <td>
                        <input
                            // id={product.id + "_item"}
                            type='text'
                            value={product.item}
                            disabled={isEditDisabled}
                            onChange={e => handleValueChange(product.id, 'item', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type='number'
                            value={product.price}
                            disabled={isEditDisabled}
                            onChange={e => handleValueChange(product.id, 'price', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type='number'
                            value={product.amount}
                            disabled={!isEditDisabled}
                            onChange={e => handleValueChange(product.id, 'amount', e.target.value)}
                        />
                    </td>
                    </tr>

                    ) : (<p>no</p>)} */}
                </tbody>
            </table>
            
        </div>
        </>
    )
}

export default MainTable;