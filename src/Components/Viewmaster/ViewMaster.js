import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar'

const ViewMaster = (Component) => {
    const NewComponent = () => {
        return (
            <>
                <div className="d-flex">
                    <Sidebar />
                    <div className='w-100'>
                  
                        <div>
                            <Component />
                        </div>

                    </div>
                </div>

            </>
        )
    }
    return NewComponent
}

export default ViewMaster

