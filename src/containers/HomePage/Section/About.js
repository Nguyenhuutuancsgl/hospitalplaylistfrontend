import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';



class About extends Component {
    
    render() {
        
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Xem các thông tin y tế chuẩn xác
                </div>
                <div className='section-about-content'>
                    
                    <div className='content-left'>
                    <iframe width="100%" height="400px" src="https://www.youtube.com/embed/iBIMHMhfrv0?si=i9ZPrqNiE1H_z-g_" 
                    title="Doctor Reacts To Marvel Medical Scenes (MCU)" 
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Hospital Playlist - Nơi bạn có thể tìm kiếm các thông tin y tế chính xác và đáng tin cậy. Chúng tôi hiểu rằng sức khỏe là tài sản quý báu nhất của mỗi người, và việc có thông tin y tế đúng đắn có thể ảnh hưởng trực tiếp đến cuộc sống của bạn. Vì vậy, chúng tôi đã tạo ra một nền tảng website mà bạn có thể tin tưởng để tìm hiểu về sức khỏe và y tế.</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(About));
