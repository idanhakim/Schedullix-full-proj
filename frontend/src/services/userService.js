import storageService from '@/services/storageService.js'
const STORAGE_KEY = 'loggedinUser';

const axios = require('axios')
const URL = (process.env.NODE_ENV !== 'development') ?
    '/users' :
    '//localhost:3000/users';

var loggedinUser = storageService.loadFromStorage(STORAGE_KEY) || null;

export default {
    login,
    logout,
    getLoggedInUser,
    addUser,
    updateUser,
    addCustomer,
    getDefaultUser,
    getUserCustomers,
    isLoggedinUser,
    getUserLoggedinId,
    getUserByBusinessName,
    removeCustomerByTime
}

function updateUser(user) {
    console.log('Service Update user > ', user)
    return axios.put(`${URL}/updateUser`, user)
    // .then(res => {
    //     return (res.data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
}

function addCustomer(userId, customer) {
    return axios.put(`${URL}/${userId}/addCustomer`, customer)
        .then(res => {
            // _setLoggedinUser(res.data.email)
            console.log(res.data)
            return (res.data)
        })
        .catch(err => {
            console.log(err)
        })

}

function addUser(user) {
    return axios.post(URL, user)
        .then(res => {
            return (res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function removeCustomerByTime(userId, customerTime) {
    var removeInfo = {
        userId,
        customerTime
    }
    return axios.post(URL + '/removeCustomer', removeInfo)
        .then(res => {
            return (res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function getUserCustomers(userId) {
    return axios.post(URL + '/customers', {
            userId
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log('didnt get customers', err)
        })
}



function logout() {
    storageService.clearStorage(STORAGE_KEY)
}

function getLoggedInUser() {
    return axios.get(`${URL}/${loggedinUser}`)
        .then((res) => {
            return res.data
        })
}

function getUserByBusinessName(businessName) {
    console.log('userService front', businessName)
    return axios.get(`${URL}/business/${businessName}`)
        .then(res => {
            return res.data
        })
}

function isLoggedinUser() {
    if (!loggedinUser) return false
    else return true
}

function getUserLoggedinId() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user._id;
    storageService.saveToStorage(STORAGE_KEY, loggedinUser)
}

function login(loginInfo) {
    return axios.post(URL + '/login', loginInfo)
        .then(res => {
            _setLoggedinUser(res.data)
            return (res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function getDefaultUser() {
    var a = {
        email: "",
        password: "",
        phone: null,
        businessName: "",
        location: {
            lat: 36.778259,
            lng: -119.417931
        },
        timePerCustomer: 30,
        workingHours: [{
                isOpen: true,
                day: 'Mon',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
            {
                isOpen: true,
                day: 'Tue',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
            {
                isOpen: true,
                day: 'Wed',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
            {
                isOpen: true,
                day: 'Thu',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
            {
                isOpen: true,
                day: 'Fri',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 0
                    }
                }
            },
            {
                isOpen: true,
                day: 'Sat',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
            {
                isOpen: true,
                day: 'Sun',
                hoursOpen: {
                    startTime: {
                        hours: 8,
                        minutes: 30
                    },
                    endTime: {
                        hours: 17,
                        minutes: 30
                    }
                }
            },
        ],
        customers: [{
                name: "AliBaba",
                Phone: "065-423",
                time: 1532583000000,
                isDone: true
            },
            {
                "name": "Pipi",
                "Phone": "065gdfgdfg54",
                "time": 1532599200000,
                "isDone": false
            }
        ],
        configElements: {
            header: {
                isActive: true,
                titleTxt: "Welcome to my Bussiness!",
                'align-items': 'center',
                'text-align': 'center',
                styleObj: {
                    color: "white",
                    background: "red",
                    'font-size': "16px",
                    'font-family': "Arial",
                    'font-weight': "700",
                    'text-align': "center",
                    'background-image': "url('https://media.ultimahora.com/adjuntos/161/imagenes/000/705/0000705263.jpg')",
                }
            },
            about: {
                isActive: true,
                titleTxt: "About us:",
                mainTxt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                styleObj: {
                    color: "white",
                    background: "#4b3e3b",
                    'font-size': "16px",
                    'font-family': "Arial",
                    'font-weight': "200",
                    'text-align': "center",
                    'background-image': "url('http://www.mimejornegocio.com/wp-content/uploads/2017/08/Barbershop_034smoke_c_Lupi_Spuma-2-570x342.jpg')",

                }
            },
            schedule: {
                isActive: true,
                colorHeader: "blue",
                colorAvailable: "",
                colorBusy: "",
                styleObj: {
                    color: "white",
                    background: "#4b3e3b",
                    'font-size': "16px",
                    'font-family': "Arial",
                    'font-weight': "700",
                    'text-align': "center",
                },
                styleDate: {
                    colorHeader: "brown",
                    landscape: true,
                    dark: true,
                    light: false,
                },
                styleApptsList: {
                    background: "#424242"
                }
            },
            map: {
                isActive: true,
                titleTxt: "....",
                styleObj: {
                    color: "white",
                    background: "#4b3e3b",
                    'font-size': "16px",
                    'font-family': "Arial",
                    'font-weight': "700",
                    'text-align': "center",
                }
            }
        }
    }
    // console.log(JSON.stringify(a));
    return a;
}