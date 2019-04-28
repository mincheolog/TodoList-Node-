const Store = {
    state : {
        Todo_id : 3,
        Todos : [
            { id: 0, text: 'test', checked: false },
            { id: 1, text: 'test1', checked: true },
            { id: 2, text: 'test2', checked: false },
        ],
        card_index : 3
    },
    user_info : {
        name : "",
        LoginUser: "",
        LoginStatus: 0,
    }
};

export default Store