import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from "../../utils"
import { changeLanguageApp } from "../../store/actions"
import { withRouter } from 'react-router';
import logo from '../../assets/logo.png'
class HomeHeader extends Component {
    changeLanguage = (language)=>{
        this.props.changeLanguageAppRedux(language)
        //fire redux event (actions)
    }
    returnToHome=()=>{
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    render() {
        const { intl } = this.props;
        let language = this.props.language;
        return (
            <>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
                        {/* <div className='header-logo'></div> */}
                        <img className='header-logo' src={logo} onClick={()=>this.returnToHome}/>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b> <FormattedMessage id = "home-header.specialities" /></b></div>
                            <div className='sub-title'> <FormattedMessage id = "home-header.search-doctor" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id = "home-header.health-facility" /></b></div>
                            <div className='sub-title'><FormattedMessage id = "home-header.choose-hospital" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id = "home-header.doctors" /></b></div>
                            <div className='sub-title'><FormattedMessage id = "home-header.choose-doctors" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id = "home-header.health-package" /></b></div>
                            <div className='sub-title'><FormattedMessage id = "home-header.health-general" /></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle'></i>
                            <FormattedMessage id = "home-header.support" />
                        </div>
                        <div className={ language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        </div>
                        <div className={ language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                        <span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                    </div>
                </div>
            </div>

            {this.props.isShowBanner===true &&
            <div className='home-header-banner'>
            <div className='content-up'>
                <div className='titleup'>HOSPITAL PLAYLIST</div>
                <div className='titledown'><FormattedMessage id = "banner.title" /></div>
                 <div className='search'>
                 <i className='fas fa-search'></i>
                    <input type='text' placeholder={intl.formatMessage({ id: 'banner.text' })} />
                 </div>

            </div>
            <div className='content-down'>
                <div className='options'>
                    <div className='option-child'>
                        <div className='icon-child'><i className='far fa-hospital'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title1" /></div>

                    </div>
                    <div className='option-child'>
                        <div className='icon-child'><i className='fa fa-microchip'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title2" /></div>

                    </div>
                    <div className='option-child'>
                        <div className='icon-child'><i className='fa fa-bed'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title3" /></div>

                    </div>
                    <div className='option-child'>
                        <div className='icon-child'><i className='fas fa-flask'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title4" /></div>

                    </div>
                    <div className='option-child'>
                        <div className='icon-child'><i className='fa fa-comments'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title5" /></div>

                    </div>
                    <div className='option-child'>
                        <div className='icon-child'><i className='fa fa-child'></i></div>
                        <div className='text-child'><FormattedMessage id = "banner.title6" /></div>

                    </div>
                </div>

            </div>
            
            </div>
            }

            </>

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
        changeLanguageAppRedux : (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader));
