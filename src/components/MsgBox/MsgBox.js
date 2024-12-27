import React from 'react';

const MsgBox = ({msgText}) => {


    return (
        <div>
            {msgText && (
                <div className='msg-box'>{msgText}</div>   
            )}
        </div>
    );
};

export default MsgBox;