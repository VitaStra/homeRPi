import React from 'react';

class SeparatorLine extends React.Component {
    render() {
        return (
            <div>

                <hr style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor: '#000000',
                }} />
            </div>
        );
    }
}

export default SeparatorLine;