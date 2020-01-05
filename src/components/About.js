import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'data': []
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-12">
                    <h1 className="Display-4">About Us</h1>
                </div>
            </div>
        )
    }
}
