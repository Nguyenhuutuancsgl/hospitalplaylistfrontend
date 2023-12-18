import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking:false,
      dataScheduleTimeModal:{}
    };
  }

  async componentDidMount() {
    const { language } = this.props;
    const allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    const allDays = [];
    for (let i = 0; i < 7; i++) {
      const object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          const ddMM = moment(new Date()).format('DD/MM');
          const today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          const labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          const ddMM = moment(new Date()).format('DD/MM');
          const today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      const allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      const allDays = this.getArrDays(this.props.language);
      const res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      const doctorId = this.props.doctorIdFromParent;
      const date = event.target.value;
      const res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };
  handleClickScheduleTime = (time)=>{
    this.setState({
      isOpenModalBooking:true,
      dataScheduleTimeModal:time
    })
    console.log('tkstand time', time);
  }
  closeBookingClose=()=>{
    this.setState({
      isOpenModalBooking:false,
    })
  }
  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      const timeDisplay =
                        language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                      return (
                        <button key={index} className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                          onClick={()=>this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal = {isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

// Inject cái biến state của redux vào biến props của function
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
