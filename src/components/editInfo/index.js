import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import CustomButton from '../ui/CustomButton.js';
import { editInfo } from '../../actions/currentUser.js';
import prevent from '../../utils/prevent.js';

import './index.scss';


const apiEndpoint = process.env.REACT_APP_API;

class EditInfo extends Component {

  state = {
    nickname: '',
    name: '',
    about: '',
    avatar: null,
    preview: '',
    password: ''
  };

  componentDidMount() {

    if (this.props.currentUser === null)
      return;

    const prevPreview = `${apiEndpoint}${this.props.currentUser.avatar}`;

    this.setState({
      nickname: this.props.currentUser.nickname,
      name: this.props.currentUser.name,
      about: this.props.currentUser.about || '',
      avatar: this.props.currentUser.avatar,
      preview: prevPreview
    });
  }

  handleEnter = () => {
    const {
      nickname,
      name,
      about,
      avatar,
      password
    } = this.state;

    const userId = this.props.currentUser._id;

    const user = {
      _id: userId,
      nickname,
      name,
      about,
      avatar
    };

    if (password !== '') user.password = password;

    this.props.editInfo(user);
  }

  clearAvatar = () => {
    this.setState({
      avatar: null,
      preview: ''
    });
  }

  handleFileInput = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        preview: reader.result
      });
    }
    if (!file) return;
    reader.readAsDataURL(file);
  }


  handleNicknameInput = (nickname) => {
    nickname = nickname.replace(/(\W*|\D*)/gi, '');
    this.setState({
      nickname
    });
  }

  handleNameInput = (name) => {
    this.setState({
      name
    });
  }

  handleAboutInput = (about) => {
    this.setState({
      about
    });
  }

  handlePasswordInput = (password) => {
    this.setState({
      password
    });
  }

  render() {

    if (this.props.currentUser === null)
      return <Redirect to={'/'} />

    const {
      nickname,
      name,
      about,
      avatar,
      preview,
      password
    } = this.state;

    const style = (avatar !== null) ? {
      backgroundImage: `url(${preview})`,
      backgroundSize: "cover"
    } :
    {};

    return (
      <div className="edit-info-container">
        <form className="edit-info">
          <div className={ cn(
            "edit-info__preview", {"edit-info__preview_default": avatar === null}
          )} style={style}
          >
            <label className="edit-info__avatar-input">
              <input
                type="file"
                accept="image/*"
                onChange={prevent(this.handleFileInput)}
              />
              <div
                className="edit-info__add"
              >
                <span>+</span>
              </div>
            </label>
            <div
              className="edit-info__clear"
              onClick={this.clearAvatar}
            >
              ×
            </div>
          </div>
           <div className="input-box edit-info__input-box edit-info__input-box">
            <input
              className={ cn(
                "input edit-info__input",
                {"edit-info__input_typing": nickname}
              )}
              value={nickname}
              onChange={(e) => this.handleNicknameInput(e.target.value)}
            />
            <label
              className={ cn(
                "edit-info__label",
                {"edit-info__label_small": nickname}
              )}>
              Имя пользователя
            </label>
          </div>
           <div className="input-box edit-info__input-box edit-info__input-box">
            <input
              className={ cn(
                "input edit-info__input",
                {"edit-info__input_typing": name}
              )}
              value={name}
              onChange={(e) => this.handleNameInput(e.target.value)}
            />
            <label
              className={ cn(
                "edit-info__label",
                {"edit-info__label_small": name}
              )}>
              Полное имя
            </label>
          </div>
          <div className="input-box edit-info__input-box edit-info__input-box">
            <input
              className={ cn(
                "input edit-info__input",
                {"edit-info__input_typing": about}
              )}
              value={about}
              onChange={(e) => this.handleAboutInput(e.target.value)}
            />
            <label
              className={ cn(
                "edit-info__label",
                {"edit-info__label_small": about}
              )}>
              О себе
            </label>
          </div>
           <div className="input-box edit-info__input-box edit-info__input-box">
            <input
              className={ cn(
                "input edit-info__input",
                {"edit-info__input_typing": password}
              )}
              type="password"
              value={password}
              onChange={(e) => this.handlePasswordInput(e.target.value)}
            />
            <label
              className={ cn(
                "edit-info__label",
                {"edit-info__label_small": password}
              )}>
              Пароль
            </label>
          </div>
          <CustomButton
            className="edit-info__add-button"
            isActive={false}
            textDisactive="Сохранить"
            onClick={prevent(this.handleEnter)}
          />
          <Link to="/" className="edit-info__back-link">
            <CustomButton
              className="edit-info__back-button"
              isActive={true}
              textActive="Назад"
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentUser: state.currentUser.user
  }),
  {
    editInfo
  }
)(EditInfo);