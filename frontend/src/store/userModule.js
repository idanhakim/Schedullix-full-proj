import userService from '../services/userService.js'

//------------------------------ ACTIONS ------------------------------
export const ACT_LOAD_USER = 'user/actions/loadUser'
export const ACT_LOAD_USER_CUSTOMER = 'user/actions/loadUserCustomer'
export const ACT_ADD_CUSTOMER = 'user/actions/addCustomer'
export const ACT_ADD_USER = 'user/actions/addUser'
export const ACT_UPDATE_USER = 'user/actions/updateUser'
export const ACT_CHECK_USER_LOGIN = 'user/actions/checkLoginUser'
export const ACT_LOAD_USER_BY_BUSINESS_NAME = 'user/actions/loadUserByBusinessName'
export const ACT_REMOVE_CUSTOMER = 'user/actions/removeCustomer'

//------------------------------ GETTERS ------------------------------
export const GETTER_TIMES_FOR_DATE = 'user/getters/timesForDate'
export const GETTER_CUSTOMERS_FOR_DATE = 'user/getters/customersForDate'
export const GETTER_USER = 'user/getters/user'
export const GETTER_TEMP_USER = 'user/getters/tempUser'
export const GETTER_USER_ID = 'user/getters/userId'
export const GETTER_CALENDER_COLOR = 'user/getters/calenderColor'
export const GETTER_IS_LOGIN = 'user/getters/isLogin'
export const GETTER_BUSINESS_NAME = 'user/getters/businessName'
export const GETTER_IS_REGISTER_USER = 'user/getters/registerUser'
export const GETTER_USER_BUSINESS_NAME = 'user/getters/businessName'
//------------------------------ MUTATIONS ----------------------------
export const MUT_ADD_CUSTOMER = 'user/mutations/addCustomer'
export const MUT_UPDATE_CUSTOMER = 'user/mutations/updateCustomer'
export const MUT_UPDATE_ABOUT_TXT = 'user/mutations/updateAboutTxt'
export const MUT_UPDATE_HEADER_IMG = 'user/mutations/updateHeaderImg'
export const MUT_SET_USER = 'user/mutations/setUser'
export const MUT_SET_TEMP_USER = 'user/mutations/setTempUser'
export const MUT_SET_USER_LOC = 'user/mutations/setUserLocation'
export const MUT_UPDATE_USER = 'user/mutations/updateUser'
export const MUT_UPDATE_WORKING_HOURS = 'user/mutations/updateWorkingHours'
export const MUT_UPDATE_COLOR_CMP = 'user/mutations/updateTextColor'
export const MUT_UPDATE_BG_COLOR_CMP = 'user/mutations/updateBackgroundColor'
export const MUT_UPDATE_IMG = 'user/mutations/updateImage'
export const MUT_UPDATE_HEADER_TITLE = 'user/mutations/updateHeaderTitle'
export const MUT_UPDATE_CALENDER_BG_COLOR = 'user/mutations/updateCalenderBgColor'
export const MUT_TOGGLE_CALENDER_THEME = 'user/mutations/toggleCalenderTheme'
export const MUT_TOGGLE_CALENDER_LANDSCAPE = 'user/mutations/toggleCalenderLandscape'
export const MUT_UPDATE_APPT_LIST_COLOR_CMP = 'user/mutations/updateApptListColor'
export const MUT_UPDATE_IS_ACTIVE_CMP = 'user/mutations/updateCmpIsActive'
export const MUT_LOGIN_USER = 'user/mutations/loginUser'
export const MUT_LOGOUT_USER = 'user/mutations/logoutUser'
export const MUT_ALIGN_HEADER_TEXT = 'user/mutations/alignHeaderText'


export default {
    state: {
        user: null,
        tempUser: null,
        isLogin: userService.isLoggedinUser()
    },
    getters: {

        [GETTER_IS_REGISTER_USER](state) {
            if (state.isLogin && state.user) {
                var userId = state.user._id;
                if (userId === "000000000000000000000000" ||
                    userId === "000000000000000000000001" ||
                    userId === "000000000000000000000002" ||
                    userId === "000000000000000000000003")

                    return false;
                    else return true;
            } else return false   
        },

        [GETTER_BUSINESS_NAME](state) {
            return state.user.businessName;
        },

        // return true - if user is login, else return false. 
        [GETTER_IS_LOGIN](state) {
            return state.isLogin;
        },

        [GETTER_TIMES_FOR_DATE]: (state) => (dateSelectedTimestamp) => {
            var listForDay = [];
            var selectDateObj = new Date(dateSelectedTimestamp);
            var day = state.user.workingHours[selectDateObj.getDay()];
            var endTime = day.hoursOpen.endTime
            var timePerCustomer = state.user.timePerCustomer
            var time = { ...day.hoursOpen.startTime
            };
            listForDay.push({ ...time
            })
            listForDay[listForDay.length - 1].timestamp = generatorTimestamp(selectDateObj, `${time.hours}:${time.minutes}`);

            while (time.hours < endTime.hours ||
                (time.minutes + timePerCustomer < endTime.minutes && time.hours === endTime.hours)) {

                time.minutes += timePerCustomer;
                if (time.minutes >= 60) {
                    time.hours++;
                    time.minutes = 0;
                }
                listForDay.push({ ...time
                })
                listForDay[listForDay.length - 1].timestamp = generatorTimestamp(selectDateObj, `${time.hours}:${time.minutes}`);
            }
            return listForDay;
        },

        [GETTER_USER](state) {
            return state.user ? state.user : null;
        },

        [GETTER_TEMP_USER](state) {
            return state.tempUser;
        },

        [GETTER_USER_ID](state) {
            return state.user ? state.user._id : userService.getUserLoggedinId();
        },

        [GETTER_CUSTOMERS_FOR_DATE]: (state) => (dateSelectedTimestamp) => {
            return state.user.customers.filter(customer => {
                return new Date(customer.time).toLocaleDateString() === new Date(dateSelectedTimestamp).toLocaleDateString()
            });
        },

        [GETTER_CALENDER_COLOR](state) {
            return state.user ? state.user.configElements.schedule.styleDate.colorHeader : null
        },
        [GETTER_USER_BUSINESS_NAME](state) {
            return state.user.businessName
        }
    },
    mutations: {

        [MUT_ADD_CUSTOMER](state, payload) {
            state.user.customers.unshift(payload.customer);
        },

        [MUT_SET_USER_LOC](state, payload) {
            state.user.location = payload.userLocation
        },

        [MUT_UPDATE_ABOUT_TXT](state, {
            aboutTxt
        }) {
            state.user.configElements.about.mainTxt = aboutTxt
        },
        [MUT_LOGIN_USER](state) {
            state.isLogin = true
        },
        [MUT_UPDATE_HEADER_IMG](state, {
            imgUrl
        }) {
            state.user.configElements.header.styleObj['background-image'] = `url(${imgUrl})`
        },

        [MUT_SET_USER](state, {
            user
        }) {
            state.user = user;
        },
        [MUT_SET_TEMP_USER](state, {
            user
        }) {
            state.tempUser = user;
        },
        [MUT_UPDATE_WORKING_HOURS](state, {
            workingHours
        }) {
            state.user.workingHours = workingHours
        },
        // [MUT_UPDATE_CUSTOMER](state, {customers}) {
        //     state.user.customers = customers
        // },
        [MUT_UPDATE_COLOR_CMP](state, payload) {
            state.user.configElements[payload.cmp].styleObj[payload.propertyToUpdate] = payload.value
        },
        [MUT_UPDATE_IMG](state, payload) {
            state.user.configElements[payload.cmp].styleObj['background-image'] = `url(${payload.imgUrl})`
        },
        [MUT_UPDATE_HEADER_TITLE](state, {
            title
        }) {
            state.user.configElements.header.titleTxt = title
        },
        [MUT_UPDATE_CALENDER_BG_COLOR](state, {
            color
        }) {
            state.user.configElements.schedule.styleDate.colorHeader = color
        },
        [MUT_TOGGLE_CALENDER_THEME](state) {
            var styleDate = state.user.configElements.schedule.styleDate
            styleDate.dark = !styleDate.dark
            styleDate.light = !styleDate.light
        },
        [MUT_TOGGLE_CALENDER_LANDSCAPE](state) {
            var styleDate = state.user.configElements.schedule.styleDate
            styleDate.landscape = !styleDate.landscape
        },
        [MUT_UPDATE_APPT_LIST_COLOR_CMP](state, {
            color
        }) {
            state.user.configElements.schedule.styleApptsList.background = color
        },
        [MUT_UPDATE_IS_ACTIVE_CMP](state, {
            cmp
        }) {
            state.user.configElements[cmp].isActive = !state.user.configElements[cmp].isActive
        },
        [MUT_LOGOUT_USER](state) {
            state.user = {}
            state.isLogin = false
        },
        [MUT_ALIGN_HEADER_TEXT](state, payload) {
        console.log('dir1', payload.direction, 'align1', payload.alignment)
            
            if (payload.direction === 'vertical') {
                state.user.configElements.header['align-items'] = payload.alignment
            } else state.user.configElements.header['text-align'] = payload.alignment
            console.log(state.user.configElements.header)
        }
    },
    actions: {
        [ACT_LOAD_USER](context, payload) {
            console.log('act load user', payload.loginInfo)
            return userService.login(payload.loginInfo)
                .then(user => {
                    context.commit({
                        type: MUT_SET_USER,
                        user
                    })
                    context.commit({
                        type: MUT_LOGIN_USER
                    })
                    console.log('act load return user', user)
                    return user;
                })
                .catch(
                    err => {
                        console.log('Wrong user to login!');
                        return err;
                    }
                )
        },
        [ACT_LOAD_USER_CUSTOMER](context) {
            return userService.getUserCustomers(context.getters[GETTER_USER_ID])
                .then(user => {
                    
                    context.commit({
                        type: MUT_SET_USER,
                        user
                    })
                    return {
                        timePerCustomer: context.state.user.timePerCustomer,
                        customers: user.customers
                    };
                })
        },

        [ACT_ADD_USER](context, payload) {
            return userService.addUser(payload.user)
                .then(res => {
                    context.commit({
                        type: MUT_SET_USER,
                        user: res.ops[0]
                    })
                    return res.ops[0]
                })
        },

        [ACT_ADD_CUSTOMER](context, payload) {
            console.log('context state', context.state.user._id)
            return userService.addCustomer(context.state.user._id, payload.customer)
                .then(() => {
                    context.commit({
                        type: MUT_ADD_CUSTOMER,
                        customer: payload.customer
                    })
                })
        },

        [ACT_UPDATE_USER](context, payload) {
            return userService.updateUser(payload.user)
                .then(() => {
                    context.commit({
                        type: MUT_SET_USER,
                        user: payload.user
                    })
                })
        },
        [ACT_CHECK_USER_LOGIN](context) {
            if (context.state.isLogin) {
                return userService.getLoggedInUser()
                    .then(user => {
                        context.commit({
                            type: MUT_SET_USER,
                            user
                        })
                        return user
                    })
            }
        },
        [ACT_LOAD_USER_BY_BUSINESS_NAME](context, {
            businessName
        }) {
            return userService.getUserByBusinessName(businessName)
                .then(user => {
                    console.log('user userModule >', user)
                    context.commit({
                        type: MUT_SET_USER,
                        user
                    })
                    return user
                })
        },
        [ACT_REMOVE_CUSTOMER](context, {
            time
        }) {
            return userService.removeCustomerByTime(context.state.user._id, time)
                .then(() => {
                    console.log('customer deleted')
                })
                .catch(() => {
                    console.log('customer no deleted')
                })
        }
    }
}

function generatorTimestamp(dateObj, strTime) {
    return new Date(`${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${strTime}`).getTime();
}