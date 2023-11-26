import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Slider from 'react-slick';



class HandBook extends Component {
    
    render() {
        
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section' >xem thêm</button>

                </div>
                <div className='section-body'>
                    
                    <Slider {...this.props.settings}>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 1</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 6</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 5</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 4</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 3</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook'/>
                            <div>Khám tổng quát 2</div>
                        </div>
                        
                        

                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HandBook));
