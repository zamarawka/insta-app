import { connect } from 'react-redux'

import { toggleFollow } from '../actions/currentUser.js';
import { fetchUser, toggleLike, toggleSave, addComment, deleteComment } from '../actions/user.js';
import ProfilePage from './ProfilePage.js';

const mapStateToProps = ( state, { match } ) => ({
  userId: match.params.nickname,
  user: state.user.user,
  currentUser: state.currentUser.user,
  isFollow:
  (state.currentUser.user && state.user.user !== null) ?
    state.currentUser.user.following.some((userId) => userId === state.user.user._id) :
    false
});

const mapDispatchToProps = {
  toggleFollow,
  toggleLike,
  toggleSave,
  fetchUser,
  addComment,
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);