import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { deleteAcount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    deleteAcount,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome  {user && user.name} (Awesome...)
        </p>
        {profile !== null ?
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className='my-2'>
                    <button className='btn btn-danger' onClick={() => deleteAcount()}>
                        <i className='fas fa-user-minus'></i>Delete My Acount
                    </button>
                </div>

            </Fragment> :
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>}
    </Fragment>;
};
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAcount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,
    { getCurrentProfile, deleteAcount })(Dashboard);
