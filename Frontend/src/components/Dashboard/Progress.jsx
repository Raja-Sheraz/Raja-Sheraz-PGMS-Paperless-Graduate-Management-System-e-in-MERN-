// import React, { useContext } from 'react'
// import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
// import { PiStudentFill } from 'react-icons/pi'
// import { MdOutlinePendingActions } from 'react-icons/md'
// import { FaClipboardCheck } from 'react-icons/fa'
// import { PiChalkboardTeacherFill } from 'react-icons/pi'
// import { GrCheckboxSelected } from 'react-icons/gr'
// import { UserContext } from '../../context/User'
// import { SiGoogleclassroom } from 'react-icons/si'

// export default function Progress() {
//     const { user } = useContext(UserContext)

//     const role = user?.role
//     return (
//         <div className="flex gap-4">
//             <>
//                 <div className="col-12 flex-wrap d-flex justify-content-between">
//                     <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
//                         <BoxWrapper>
//                             <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
//                                 <SiGoogleclassroom className="text-2xl text-white" />
//                             </div>
//                             <div className="pl-4">
//                                 <span className="text-sm text-gray-500 font-light">Committee Acceptance</span>
//                                 <div className="flex items-center">
//                                     {user?.commetti_acceptence == 'accepted' ? (
//                                         <span className="text-sm text-green-500">Accepted</span>
//                                     ) : (
//                                         <span className="text-sm text-gray-500">Pending</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </BoxWrapper>
//                     </div>
//                     <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
//                         <BoxWrapper>
//                             <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400">
//                                 <FaClipboardCheck className="text-2xl text-white" />
//                             </div>
//                             <div className="pl-4">
//                                 <span className="text-sm text-gray-500 font-light">DAC Members Acceptance</span>
//                                 <div className="flex items-center">
//                                     {user?.dac_acceptence == 'accepted' ? (
//                                         <span className="text-sm text-green-500">Accepted</span>
//                                     ) : (
//                                         <span className="text-sm text-gray-500">Pending</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </BoxWrapper>
//                     </div>
//                     <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
//                         <BoxWrapper>
//                             <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
//                                 <PiChalkboardTeacherFill className="text-2xl text-white" />
//                             </div>
//                             <div className="pl-4">
//                                 <span className="text-sm text-gray-500 font-light">Dean Acceptance</span>
//                                 <div className="flex items-center">
//                                     {user?.dean_acceptence == 'accepted' ? (
//                                         <span className="text-sm text-green-500">Accepted</span>
//                                     ) : (
//                                         <span className="text-sm text-gray-500">Pending</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </BoxWrapper>
//                     </div>
//                 </div>
//             </>
//         </div>
//     )
// }

// function BoxWrapper({ children }) {
//     return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
// }
import React, { useContext } from 'react'
import { FaClipboardCheck } from 'react-icons/fa'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { SiGoogleclassroom } from 'react-icons/si'
import { UserContext } from '../../context/User'

export default function Progress() {
    const { user } = useContext(UserContext)

    const role = user?.role
    return (
        <div className="flex flex-col gap-4">
            <div className="col-12 flex-wrap d-flex flex-col justify-content-between">
                <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                    <BoxWrapper>
                        <div className="flex items-center">
                            <div
                                className="rounded-full h-16 w-16 flex items-center justify-center bg-orange-600"
                                style={{ marginTop: '20px' }}
                            >
                                <SiGoogleclassroom className="text-2xl text-white" style={{ textAlign: 'center' }} />
                            </div>
                            <div className="pl-4" style={{ textAlign: 'left' }}>
                                <span
                                    className="text-sm font-light"
                                    style={{ color: 'white', fontSize: '17px', fontFamily: 'monospace' }}
                                >
                                    Committee Acceptance
                                </span>
                                <div className="flex items-center">
                                    {user?.commetti_acceptence === 'accepted' ? (
                                        <span
                                            className="text-sm text-green-500"
                                            style={{ color: '#14f623', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Accepted
                                        </span>
                                    ) : (
                                        <span
                                            className="text-sm text-gray-500"
                                            style={{ color: 'orange', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </BoxWrapper>
                </div>
                <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                    <BoxWrapper>
                        <div className="flex items-center">
                            <div
                                className="rounded-full h-16 w-16 flex items-center justify-center bg-green-400"
                                style={{ marginTop: '20px' }}
                            >
                                <FaClipboardCheck className="text-2xl text-white" style={{ textAlign: 'center' }} />
                            </div>
                            <div className="pl-4" style={{ textAlign: 'left' }}>
                                <span
                                    className="text-sm font-light"
                                    style={{ color: 'white', fontSize: '17px', fontFamily: 'monospace' }}
                                >
                                    DAC Members Acceptance
                                </span>
                                <div className="flex items-center">
                                    {user?.dac_acceptence === 'accepted' ? (
                                        <span
                                            className="text-sm text-green-500"
                                            style={{ color: '#14f623', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Accepted
                                        </span>
                                    ) : (
                                        <span
                                            className="text-sm text-gray-500"
                                            style={{ color: 'orange', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </BoxWrapper>
                </div>
                <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                    <BoxWrapper>
                        <div className="flex items-center">
                            <div
                                className="rounded-full h-16 w-16 flex items-center justify-center bg-yellow-400"
                                style={{ marginTop: '20px' }}
                            >
                                <PiChalkboardTeacherFill
                                    className="text-2xl text-white"
                                    style={{ textAlign: 'center' }}
                                />
                            </div>
                            <div className="pl-4" style={{ textAlign: 'left' }}>
                                <span
                                    className="text-sm font-light"
                                    style={{ color: 'white', fontSize: '17px', fontFamily: 'monospace' }}
                                >
                                    Deen Acceptance
                                </span>
                                <div className="flex items-center">
                                    {user?.deen_acceptence === 'accepted' ? (
                                        <span
                                            className="text-sm text-green-500"
                                            style={{ color: '#14f623', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Accepted
                                        </span>
                                    ) : (
                                        <span
                                            className="text-sm text-gray-500"
                                            style={{ color: 'orange', fontSize: '17px', fontFamily: 'monospace' }}
                                        >
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </BoxWrapper>
                </div>
            </div>
        </div>
    )
}

function BoxWrapper({ children }) {
    return (
        <div
            style={{
                backgroundColor: '#7445C4',
                borderRadius: '10px',
                width: '300px',
                marginBottom: '20px',
                height: '100px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Initial box shadow
                transition: 'box-shadow 0.3s ease, border 0.3s ease', // Transition effect for the shadow and border
                border: '2px solid transparent', // Initial border
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)'; // Darker shadow on hover
                e.currentTarget.style.border = '2px solid #5a34a6'; // Add border on hover
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'; // Original shadow when not hovered
                e.currentTarget.style.border = '2px solid transparent'; // Remove border when not hovered
            }}
        >
            {children}
        </div>
    );
}




