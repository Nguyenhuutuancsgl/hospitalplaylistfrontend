import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';



class HomeFooter extends Component {
    
    render() {
        
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Hospital Playlist. </p>
            </div>

        );
        
    }

}
// inject cái biến state của redux vào biến props của function
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeFooter));
