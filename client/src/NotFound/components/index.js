import React from 'react';
import './index.scss';
import Layout from '~/common/components/Layout/Layout.js';

const NotFoundView = props => {
    return (
        <Layout>
            <div className={'not-found-container'}>
                <div className={'not-found-container__title'}>page not found</div>
                <div className={'not-found-container__link-to-home-wrapper'}>
                    <span
                        className={'not-found-container__link-to-home'}
                        onClick={()=>{props.goToHomePage()}}
                    >
                        home
                    </span>
                </div>
            </div>
        </Layout>
    );
}

export default NotFoundView;
