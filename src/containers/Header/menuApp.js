export const adminMenu = [
    { //quanlynguoi dung
        name: 'menu.admin.manage-user',
         menus: [
            { 
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            { 
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
        
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            { 
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            
        ]
    },
    { //quanlyn phong kham
        name: 'menu.admin.clinic',
         menus: [
            { 
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
           
            
        ]
    },
    { //quanlyn chuyenkhoa
        name: 'menu.admin.specialty',
         menus: [
            { 
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
           
            
        ]
    },
    { //quanlyn camnang
        name: 'menu.admin.handbook',
         menus: [
            { 
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
           
            
        ]
    },
];