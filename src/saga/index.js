//import các sự kiện của loading
import { showLoading, hideLoading } from "../actions/ui";
//import các sự kiện của tải dữ liệu
import {
    fetchListUsersSuccess,
    fetchListUsersFailed,
    addUsersSuccess,
    addUsersFailed
} from "./../actions/users";
import {
    fetchListTaskSuccess,
    fetchListTaskFailed,
    deleteTaskSuccess,
    deleteTaskFailed,
    updateTaskSuccess,
    updateTaskFailed
} from "./../actions/tasks";
import { addTaskSuccess, addTaskFailed } from "./../actions/tasks";
import { hideModal } from "./../actions/modal";

import {
    fork,
    take,
    put,
    delay,
    takeLatest,
    select,
    takeEvery
} from "redux-saga/effects";

import * as usersTypes from "../contans/users";
import * as tasksTypes from "../contans/tasks";

let dataLocal = JSON.parse(localStorage.getItem("users"));
if (!dataLocal) {
    localStorage.setItem("users", JSON.stringify([]));
}
var id = 0;
//lấy dữ liệu users
function* watchListUsersActions() {
    while (true) {
        //lắng nghe sự kiện FETCH_USERS
        yield take(usersTypes.FETCH_USERS);
        //nếu bắt được sự kiện mới thực hiện bên dưới
        let dataLocal = JSON.parse(localStorage.getItem("users")); //lấy item có key là users
        if (dataLocal.length > -1) {
            //thực hiện hàm lấy dữ liệu thành công
            yield put(fetchListUsersSuccess(dataLocal));
        } else {
            //thực hiện hàm lấy dữ liệu thất bại
            yield put(fetchListUsersFailed(dataLocal));
        }
    }
}
//lấy dữ liệu users hiện tại
function* watchListTaskAction() {
    while (true) {
        yield take(tasksTypes.FETCH_TASK); //lắng nghe và theo dõi action
        //khi fetch đc bắt thì code dưới mới đc chạy
        yield put(showLoading());
        //===từ đây sẽ bị block===//

        let dataLocal = JSON.parse(localStorage.getItem("currentUsers")); //lấy item có key là users
        if (dataLocal) {
            //dispatch action fetchListTaskSuccess
            yield put(fetchListTaskSuccess(dataLocal.data));
        } else {
            //dispatch action fetchListTaskFalse
            yield put(fetchListTaskFailed(dataLocal.data));
        }
        //trì hoãn đóng loading 1s để tăng trải nghiệm người dùng
        yield delay(1000);
        //đóng loading
        yield put(hideLoading());
    }
}
//đăng ký users
function* addUsersSaga({ payload }) {
    const { name, password, data } = payload;
    yield put(showLoading());
    let currentLocal = JSON.parse(localStorage.getItem("users")); //lấy item có key là users
    let newLocal = [
        ...currentLocal,
        {
            name,
            password,
            data,
            id
        }
    ];
    localStorage.setItem("users", JSON.stringify(newLocal));

    if (newLocal.length > -1) {
        yield put(addUsersSuccess(newLocal[id]));
    } else {
        yield put(addUsersFailed(newLocal[id]));
    }

    id = id + 1;
    //ẩn loadding
    yield delay(1000);
    yield put(hideLoading());
}

//Thêm mới công việc vào users hiện tại
function* addTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);
    let currentLocal = JSON.parse(localStorage.getItem("users")); //lấy item có key là users
    let newLocal = [
        ...currentLocal.slice(0, taskEditing.id),
        {
            name,
            password,
            data,
            id: taskEditing.id
        },
        ...currentLocal.slice(taskEditing.id + 1)
    ];
    localStorage.setItem("users", JSON.stringify(newLocal));

    localStorage.setItem(
        "currentUsers",
        JSON.stringify({
            name,
            password,
            data,
            id: taskEditing.id
        })
    );
    if (newLocal.length > -1) {
        yield put(addTaskSuccess(data));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(addTaskFailed(data));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

//xóa công việc của users hiện tại
function* deleteTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);
    let currentLocal = JSON.parse(localStorage.getItem("users")); //lấy item có key là users
    let newLocal = [
        ...currentLocal.slice(0, taskEditing.id),
        {
            name,
            password,
            data,
            id: taskEditing.id
        },
        ...currentLocal.slice(taskEditing.id + 1)
    ];
    localStorage.setItem("users", JSON.stringify(newLocal));

    localStorage.setItem(
        "currentUsers",
        JSON.stringify({
            name,
            password,
            data,
            id: taskEditing.id
        })
    );
    if (newLocal.length > -1) {
        yield put(deleteTaskSuccess(data));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(deleteTaskFailed(data));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

//sửa công việc của users hiện tại
function* updateTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);
    let currentLocal = JSON.parse(localStorage.getItem("users")); //lấy item có key là users
    let newLocal = [
        ...currentLocal.slice(0, taskEditing.id),
        {
            name,
            password,
            data,
            id: taskEditing.id
        },
        ...currentLocal.slice(taskEditing.id + 1)
    ];
    localStorage.setItem("users", JSON.stringify(newLocal));

    localStorage.setItem(
        "currentUsers",
        JSON.stringify({
            name,
            password,
            data,
            id: taskEditing.id
        })
    );
    if (newLocal.length > -1) {
        yield put(updateTaskSuccess(data));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(updateTaskFailed(data));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

function* rootSaga() {
    //lấy danh sách users
    yield fork(watchListUsersActions);
    //lấy dữ liệu người dùng hiện tại
    yield fork(watchListTaskAction);
    //Thêm users
    yield takeEvery(usersTypes.ADD_USERS, addUsersSaga);
    //Thêm mới công việc
    yield takeEvery(tasksTypes.ADD_TASK, addTaskSaga);
    //Xóa công việc
    yield takeLatest(tasksTypes.DELETE_TASK, deleteTaskSaga);
    //Xóa công việc
    yield takeLatest(tasksTypes.UPDATE_TASK, updateTaskSaga);
}

export default rootSaga;
