import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-12">
                    <h2 className="Display-3">Our Topics</h2>
                </div>
            </div>
        )
    }
}