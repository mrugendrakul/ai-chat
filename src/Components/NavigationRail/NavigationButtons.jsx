import React from 'react'

const NavigationButtons = ({ listOfButtons = [{
    ButtonIcon: 'Button',
    ButtonText:'Button',
    onMouseEnter: () => { },
    onMouseLeave: () => { },
    onClick : ()=>{},
}
],expanded=false
}) => {
    return (
        <div className='nav-buttons-list'>
            {listOfButtons.map((button,index) => 
                <button
                key={index}
                    onMouseEnter={button.onMouseEnter}
                    onMouseLeave={button.onMouseLeave}
                    onClick={button.onClick}
                // onClick={() => {
                //     dispatchRailState({ railState: railStates.hover })
                // }
                // // }
                
                    // truncate text-clip transition-all 
                    // text-2xl
                    // delay-200 ease-in-out transition-discrete
                className='nav-buttons-item
                 '
                >
                    <span className=''>{button.ButtonIcon}</span>
                    {expanded && <p className='nav-buttons-text'>{button.ButtonText}</p>}
                </button>
            )}
        </div>
    )
}

export default NavigationButtons