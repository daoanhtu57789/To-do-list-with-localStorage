import * as usersConstants from "./../contans/users";
import * as tasksConstants from "./../contans/tasks";

let data = JSON.parse(localStorage.getItem("currentUsers")); //lấy item có key là currentUsers
const initialState = {
    listUsers : [],
    currentUsers : data?data : null,
    usersAccess : false,
    checkSingup : false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case usersConstants.FETCH_USERS:{
            return {
                ...state,
                listUsers : [],
                checkSingup : false
            }
        }

        case usersConstants.FETCH_USERS_SUCCESS:{
            const {data} = action.payload;
            return {
                ...state,
                listUsers : data
            }
        }

        case usersConstants.FETCH_USERS_FALSE:{
            return {
                ...state,
                listUsers : []
            }
        }

        case usersConstants.USERS_ACCESS_SUCCESS:{
            const {data} = action.payload;
            localStorage.setItem('currentUsers' , JSON.stringify(data));
            return {
                ...state,
                usersAccess : true,
                currentUsers : data
            }
        }

        case usersConstants.USERS_ACCESS_FALSE:{
            localStorage.setItem('currentUsers' , JSON.stringify(null));
            return {
                ...state,
                usersAccess : false
            }
        }

        case usersConstants.ADD_USERS :{
            return {
                ...state
            }
        }

        case usersConstants.ADD_USERS_SUCCESS :{
            const {data} = action.payload;
            return {
                ...state,
                listUsers : [data].concat(state.listUsers),
                checkSingup : true
            }
        }

        case usersConstants.ADD_USERS_FALSE :{
            return {
                ...state,
                checkSingup : false
            }
        }

        case tasksConstants.ADD_TASK_SUCCESS: {
            const { data } = action.payload;
            localStorage.setItem('currentUsers',JSON.stringify({
                name : state.currentUsers.name,
                password : state.currentUsers.password,
                data,
                id : state.currentUsers.id
            }));
            return {
                ...state,
                currentUsers : {
                    name : state.currentUsers.name,
                    password : state.currentUsers.password,
                    data,
                    id : state.currentUsers.id
                }
            };
        }

        case tasksConstants.DELETE_TASK_SUCCESS: {
            const { data } = action.payload;
            localStorage.setItem('currentUsers',JSON.stringify({
                name : state.currentUsers.name,
                password : state.currentUsers.password,
                data,
                id : state.currentUsers.id
            }));
            return {
                ...state,
                currentUsers : {
                    name : state.currentUsers.name,
                    password : state.currentUsers.password,
                    data,
                    id : state.currentUsers.id
                }
            };
        }

        case tasksConstants.UPDATE_TASK_SUCCESS: {
            const { data } = action.payload;
            localStorage.setItem('currentUsers',JSON.stringify({
                name : state.currentUsers.name,
                password : state.currentUsers.password,
                data,
                id : state.currentUsers.id
            }));
            return {
                ...state,
                currentUsers : {
                    name : state.currentUsers.name,
                    password : state.currentUsers.password,
                    data,
                    id : state.currentUsers.id
                }
            };
        }

        default:
            return {
                ...state
            };
    }
};

export default reducer;
