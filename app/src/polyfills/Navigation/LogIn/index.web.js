import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { randomBytes } from "crypto";
import { createCipher } from "aes256";
import { login } from "shared/types/Basic/LogIn";
import styles from "./styles";

function randomPasswordString(length) {
  let str = randomBytes(length * 2).toString("base64");
  str = str.repeat(Math.ceil(str.length / length));
  str = str.substr(0, length);
  return str;
}

Modal.setAppElement("#root");

class LogIn extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      open: false,
      username: "",
      password: "",
      passwordLength: 0,
      usernameId: `username: ${randomBytes(8).toString("base64")}`,
      passwordId: `password: ${randomBytes(8).toString("base64")}`
    };

    this.#cipher = createCipher(`key: ${randomBytes(256).toString("base64")}`);

    this.closeModal = this.closeModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  #cipher;

  closeModal() {
    const newState = {
      ...this.state,
      open: false
    };
    this.setState(newState);
  }

  handlePasswordChange(event) {
    event.stopPropagation();
    const { value } = event.target;
    const { password, passwordLength } = this.state;
    const cipher = this.#cipher;
    const newState = Object.assign({}, this.state);
    const pass = password.length > 0 ? cipher.decrypt(password) : "";
    // console.log(pass);
    if (value.length > passwordLength) {
      newState.password = pass + value.substr(-1, 1);
    } else {
      newState.password = pass.substr(0, pass.length - 1);
    }
    newState.passwordLength = newState.password.length;
    newState.password =
      newState.passwordLength > 0 ? cipher.encrypt(newState.password) : "";
    this.setState(newState);
  }

  handleUsernameChange(event) {
    const newState = {
      ...this.state,
      username: event.target.value
    };
    this.setState(newState);
  }

  handleSubmit(event) {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch({
      type: login,
      data: {
        username,
        password: this.#cipher.decrypt(password)
      }
    });
    event.stopPropagation();
  }

  render() {
    const {
      open,
      username,
      passwordLength,
      usernameId,
      passwordId
    } = this.state;
    return (
      <div>
        <a
          onClick={e => {
            const newState = {
              ...this.state,
              open: true
            };
            this.setState(newState);
            e.stopPropagation();
          }}
          role="button"
          tabIndex="-1"
        >
          Log In
          <FontAwesomeIcon icon={faSignInAlt} />
        </a>
        <Modal
          isOpen={open}
          onRequestClose={this.closeModal}
          style={styles.Modal}
          contentLabel="Login Modal"
        >
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
            <label htmlFor={usernameId}>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleUsernameChange}
              id={usernameId}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
            <label htmlFor={passwordId}>Password:</label>
            <input
              type="password"
              name="password"
              value={randomPasswordString(passwordLength)}
              onChange={this.handlePasswordChange}
              id={passwordId}
            />
          </div>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
          <button onClick={this.closeModal} type="button">
            close
          </button>
          <div>
            <a href="//www.morteam.com/login">SSO</a>
            <a href="//www.morteam.com/signup">Signup</a>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
