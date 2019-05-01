import React, { Component } from 'react';
import '../css/notice.css';
import Notice_Card from '../components/NoticeCard';

class Notice extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const notice_info = {
            index3 : {
                title : "Update!",
                date : "April 23, 2019",
                body : "Update to Todo Application. Add Function Notice List. Thanks Everybody"
            },
            index2 : {
                title : "Bug Fix",
                date : "December 10, 2018",
                body : "Bug Fix TodoApplication. for version 1.0."
            },
            index1 : {
                title : "first launching!",
                date : "October 25, 2018",
                body : "Hello! Thanks for this application users."
            }
        };
        return(
            <div className="page-notice">
                <section className="page-notice-section">
                    {Object.keys(notice_info).map((key, index) => (
                        <Notice_Card title={notice_info[key].title} date={notice_info[key].date} body={notice_info[key].body} index={index}/>
                    ))}
                </section>
            </div>
            );
    }
}

export default Notice