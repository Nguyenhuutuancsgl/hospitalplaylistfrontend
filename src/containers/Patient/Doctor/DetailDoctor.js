import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage, injectIntl } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId:-1,
        }
    }
    componentDidUpdate(prevProps, prevState){
        
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id ){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res =  await getDetailInforDoctor(id); 
            if(res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        let {detailDoctor} = this.state;
        let nameVi='', nameEn='';
        if(detailDoctor&&detailDoctor.positionData) {
             nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
             nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader 
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{backgroundImage:`url(${detailDoctor && detailDoctor.image ? detailDoctor.image :''})`}}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor&&detailDoctor.Markdown&&detailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                                <div className='content-left'>
                                    <DoctorSchedule
                                        doctorIdFromParent={this.state.currentDoctorId}
                                    />
                                </div>
                                <div className='content-right'>
                                    <DoctorExtraInfor
                                        doctorIdFromParent={this.state.currentDoctorId}
                                    />
                                </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor&&detailDoctor.Markdown&&detailDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{__html:detailDoctor.Markdown.contentHTML}}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>
                    </div>
                </div>
            </>

        );
        
    }

}
// inject cái biến state của redux vào biến props của function
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        // topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadTopDoctors: ()=>dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DetailDoctor));
