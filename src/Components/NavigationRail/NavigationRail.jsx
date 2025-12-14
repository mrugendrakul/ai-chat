import React, { Activity, useLayoutEffect, useReducer } from 'react'
import Menu from '../../Icons/Menu'
import NavigationButtons from './NavigationButtons'
import Worker from '../../Icons/Worker'
import Account from '../../Icons/Account'
import './NavigationRail.css'

const NavigationRail = () => {
    const railStates = {
        normal: 'normal',
        expanded: 'expanded',
        hover: 'hover',
        notHover: 'notHover'
    }

    const railReducer = (state, action) => {
        if (state === railStates.expanded && action.railState === railStates.hover) {
            return railStates.expanded
        }
        else if (state === railStates.expanded && action.railState === railStates.notHover) {
            return railStates.expanded
        }
        else if (state === railStates.normal && action.railState === railStates.hover) {
            return railStates.hover
        }
        else {
            return action.railState
        }
    }

    const initialState = window.innerWidth < 925 ? railStates.normal : railStates.expanded
    const [railState, dispatchRailState] = useReducer(railReducer, initialState)

    useLayoutEffect(() => {
        window.addEventListener('resize',
            () => {
                if (window.innerWidth < 925) {
                    dispatchRailState({ railState: railStates.normal })
                }
            }
        )

        return window.removeEventListener('resize ', () => { console.log("Task complete") })
    })
// `${railState === railStates.expanded ? 'w-80' : 'w-20'}
    return (
        <div
            className='navigation-rail'
            style={{width:`${railState === railStates.expanded ?'250px':'80px'}`}}
            >
            <div
                className='navigation-rail-content'
                style={{width:`${railState === railStates.expanded ? '250px' : railState === railStates.hover ? ' 250px' : '80px'} `}}
            >
                <div className='nav-rail-inside'>
                    <div className='nav-chats'>
                        <button
                            onClick={() => {
                                if (railState === railStates.normal || railState === railStates.notHover) {
                                    dispatchRailState({ railState: railStates.expanded })
                                }
                                else {
                                    dispatchRailState({ railState: railStates.normal })
                                }
                            }}
                            className='nav-button '
                        >
                            <Menu expanded={railState === railStates.expanded}
                                // className={`h-8 w-8 ${railState === railStates.expanded ? 'rotate-0' : 'rotate-180'} transition-transform ease-in-out`} 
                                className={`nav-menu-button ${railState === railStates.expanded ? 'rotate-0' : 'rotate-180'}` }
                                />
                        </button>
                        <Activity
                        mode={railState === railStates.expanded?"visible":"hidden"}
                        >
                        <NavigationButtons
                            listOfButtons={[
                                {
                                    ButtonText: 'Hire Worker',
                                    // ButtonIcon: <Worker className = "nav-buttons-icon" />,
                                    // onMouseEnter: () => {
                                    //     dispatchRailState({ railState: railStates.hover })
                                    // },
                                    // onMouseLeave: () => {
                                    //     dispatchRailState({ railState: railStates.notHover })
                                    // }
                                },
                                {
                                    ButtonText: 'Hire Worker',
                                    // ButtonIcon: <Worker className='nav-buttons-icon' />,
                                    // onMouseEnter: () => {
                                    //     dispatchRailState({ railState: railStates.hover })
                                    // },
                                    // onMouseLeave: () => {
                                    //     dispatchRailState({ railState: railStates.notHover })
                                    // }
                                }
                            ]
                            }
                            expanded={railState === railStates.expanded || railState === railStates.hover}
                        />
                        </Activity>
                    </div>
                    <div className='flex flex-col'>

                        <div
                            className={`flex flex-row justify-around p-4 mb-18 truncate text-clip`}
                            // onMouseEnter={() => {
                            //     dispatchRailState({ railState: railStates.hover })
                            // }}
                            // onMouseLeave={() => {
                            //     dispatchRailState({ railState: railStates.notHover })
                            // }}
                        >
                            <span className='ps-2'><Account style={{width:'24px',height:'24px'}} /></span>
                            <p className={`text-2xl delay-200 truncate 
                            text-clip ease-in-out transition-discrete
                            ${railState === railStates.expanded || railState === railStates.hover ? 'opacity-100' : 'opacity-0'}
                            `}

                            >Mrugendra</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationRail