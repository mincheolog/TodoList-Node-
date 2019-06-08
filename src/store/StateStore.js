const Store = {
    state : {
        Todo_id : 3,
        Todos : [
            { id: 0, start_time: 'AM 00:00', end_time: 'PM 00:00', text: 'test', checked: false },
            { id: 1, start_time: 'AM 00:00', end_time: 'PM 00:00', text: 'test1', checked: true },
            { id: 2, start_time: 'AM 00:00', end_time: 'PM 00:00', text: 'test2', checked: false },
        ],
        card_index : 3,
        selected_date : ""
    },
    user_info : {
        name : "",
        LoginUser: "",
        LoginStatus: 0,
    }
};

export default Store