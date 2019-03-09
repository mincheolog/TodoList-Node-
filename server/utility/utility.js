const UTIL = {
    GET_CURRENT_DATE : () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        day = day.toString.length == 1 ? "0" + day : day;

        date = year + "-" + "0" + month + "-" + day;

        return date;
    },
    GET_YESTERDAY : () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate() - 1;

        date = year + "-" + "0" + month + "-" + day;

        return date;
    }
};

module.exports = UTIL;