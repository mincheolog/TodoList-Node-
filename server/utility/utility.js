const UTIL = {
    GET_CURRENT_DATE : () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month.toString().length === 1 ? "0" + month : month;
        day = day.toString().length === 1 ? "0" + day : day;

        date = year + "-" + month + "-" + day;

        return date;
    },
    GET_YESTERDAY : () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate() - 1;

        month = month.toString().length === 1 ? "0" + month : month;
        day = day.toString().length === 1 ? "0" + day : day;

        date = year + "-" + month + "-" + day;

        return date;
    },
    CREATE_HTML : (object) => {
        let reduce_object = object.split("/*");
        reduce_object = reduce_object[1].split("*/");

        let HTML_str = reduce_object[0];

        return HTML_str;
    }
};

module.exports = UTIL;