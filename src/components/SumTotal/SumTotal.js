import React from "react";

const SumTotal = ({productsList}) => {
    
    return(
        <div className="sumTotal">
            <h4>סה"כ חשבון</h4>
            <p>
                {productsList.length ? productsList.reduce(
                    (currTotal, product) => 
                        (product.price && product.amount ?
                            (currTotal + (Number(product.price) * Number(product.amount))) : 
                            currTotal)
                            ,0
                ) : ''} ₪ 
            </p>
        </div>
    )
}

export default SumTotal;