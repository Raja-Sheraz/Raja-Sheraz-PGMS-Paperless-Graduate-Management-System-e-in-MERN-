
import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
import { GiCaptainHatProfile } from "react-icons/gi";
import { TbDatabaseSearch } from "react-icons/tb";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { MdGroups } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";


export const DASHBOARD_SIDEBAR_LINKS_ADMIN = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCube />
    },
    {
        key: 'proposal',
        label: 'Proposal Submission',
        path: '/proposal',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'supervisor',
        label: 'SupeVisor',
        path: '/supervisor',
        icon: <HiOutlineUsers />
    },

    {
        key: 'student',
        label: 'Students',
        path: '/students',
        icon: <HiOutlineUsers />
    }
]
export const DASHBOARD_SIDEBAR_LINKS_TEACHER = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    // {
    //     key: 'profile',
    //     label: 'Profile',
    //     path: '/profile',
    //     icon: <HiOutlineCube />
    // },
    {
        key: 'Repository',
        label: 'Digital Repository',
        path: '/Drepository',
        icon: <TbDatabaseSearch style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: 'student',
        label: 'Students',
        path: '/students',
        icon: <HiOutlineUsers />
    },
    {
        key: 'proposals',
        label: 'Proposals',
        path: '/view/proposals/supervisor',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },
    {
        key: 'Documents',
        label: 'Documents',
        path: '/Viewpapers',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },
    {
        key: 'Committe Student',
        label: 'Committe Student',
        path: '/commettistudents',
        icon: <MdGroups style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <IoIosSettings />
    }
]
export const DASHBOARD_SIDEBAR_LINKS_STUDENT = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid  style={{color:'white',fontSize:'25px',}}/>
    },
    // {
    //     key: 'profile',
    //     label: 'Profile',
    //     path: '/profile',
    //     icon: <GiCaptainHatProfile style={{color:'greenyellow'}}/>,

    // },
    // {
    //     key: 'profile',
    //     label: 'table',
    //     path: '/Muitable',
    //     icon: <HiOutlineCube />
    // },
   
    {
        key: 'proposal',
        label: 'Proposals',
        path: '/proposal',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: 'comments',
        label: 'Comments',
        path: '/comments',
        icon: <TfiCommentsSmiley style={{color:'white',fontSize:'25px'}} />

    },
    {
        key: 'mycommetti',
        label: 'My Committe',
        path: '/mycommetti',
        icon: <MdGroups style={{color:'white',fontSize:'25px'}}/>

    },
    {
        key: 'Repository',
        label: 'Digital Repository',
        path: '/Drepository',
        icon: <TbDatabaseSearch style={{color:'white',fontSize:'25px'}}/>

    },
    {
        key: 'Documents',
        label: 'Documents',
        path: '/mypapers',
        icon: <HiOutlineUsers />
    },
    // {
    //     key: 'applicaionform',
    //     label: 'Application Form',
    //     path: '/application-form',
    //     icon: <HiOutlineUsers />
    // },
    {
        key: 'templates',
        label: 'Templates',
        path: '/templates',
        icon: <HiOutlineDocumentText />
    },
    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <IoIosSettings />
    }
]


export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <IoIosSettings />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]

export const DASHBOARD_SIDEBAR_LINKS_COMMETTI = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    // {
    //     key: 'profile',
    //     label: 'Profile',
    //     path: '/profile',
    //     icon: <HiOutlineCube />
    // },
    {
        key: 'Repository',
        label: 'Digital Repository',
        path: '/Drepository',
        icon: <TbDatabaseSearch style={{color:'white',fontSize:'25px'}}/>
    },
    {
        key: 'Students',
        label: 'Students',
        path: '/commettistudents',
        icon: <HiOutlineCube />
    },

    {
        key: 'papers',
        label: 'Documents',
        path: '/Viewpapers',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <IoIosSettings />
    }
]

export const DASHBOARD_SIDEBAR_LINKS_DAC = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    // {
    //     key: 'profile',
    //     label: 'Profile',
    //     path: '/profile',
    //     icon: <HiOutlineCube />
    // },
    {
        key: 'Repository',
        label: 'Digital Repository',
        path: '/Drepository',
        icon: <TbDatabaseSearch style={{color:'white',fontSize:'25px'}}/>
    },
    {
        key: 'papers',
        label: 'Documents',
        path: '/Viewpapers',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <IoIosSettings />
    }
]

export const DASHBOARD_SIDEBAR_LINKS_DEAN = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCube />
    },
    {
        key: 'papers',
        label: 'Documents',
        path: '/Viewpapers',
        icon: <GrDocumentPdf style={{color:'white',fontSize:'25px'}}/>
    },

    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <IoIosSettings />
    }
]