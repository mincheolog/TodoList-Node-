import React, { Component } from 'react';
import '../css/page404.css';
import page404_img from '../../static/page404.png';

export default class NotFound extends React.Component {
    render(){
        return(
            <div className="page404">
                <section className="page-404-section">
                    <article className="page-404-article">
                        Page Not Found 404
                    </article>
                    <div className="page-404-btn-group">
                        <button className="page-404-btn btn-help">help</button>
                        <button className="page-404-btn btn-home">home</button>
                    </div>
                    <div className="page-404-image">
                        <img src={page404_img}/>
                    </div>
                </section>
            </div>
        );
    }
}