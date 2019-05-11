import React, { Component } from 'react';

export default class ErrorComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            error_info: null
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({
            error: error,
            error_info: errorInfo
        })
    }

    render() {
        if(this.state.error) {
            return (
                <main>
                    <section>
                        <h1>ERROR</h1>
                        <div>{this.state.error && this.state.error.toString()}</div>
                        <div>{this.state.error_info.componentStack}</div>
                    </section>
                </main>
            )
        }

        return this.props.children

    }
}