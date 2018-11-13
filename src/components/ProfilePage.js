import React, { Component } from 'react';

import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';
import * as api from '../api/users';

class ProfilePage extends Component {
  state = {
    user: null
  };

  loadData = () => {
    this.props.fetchUser(this.props.userId);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  render() {
    const {
      userId,
      currentUser,
      isFollow,
      toggleFollow
    } = this.props;

    const {
      user
    } = this.state;

    if (!userId) {
      return (
        <div>
          User not selected
        </div>
      );
    }

    return (
      <div className="profile-page">
        <Header />
        { user ?
          <>
            <Profile user={user} currentUser={currentUser} isFollow={isFollow} toggleFollow={toggleFollow} />
            <Feed user={user} currentUser={currentUser} isFollow={isFollow} toggleFollow={toggleFollow} />
          </> :
          <div className="loading">
            Loading...
          </div>
        }
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;