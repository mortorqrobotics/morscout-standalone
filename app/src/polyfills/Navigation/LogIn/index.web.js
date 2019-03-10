import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import nanoid from "nanoid";
import { createCipher } from "aes256";
import { login } from "shared/types/Basic/LogIn";
import styles from "./styles";

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
      passwordOverlay: "",
      passwordLength: 0,
      usernameId: `username: ${nanoid(8)}`,
      passwordId: `password: ${nanoid(8)}`
    };

    this.#cipher = createCipher(`key: ${nanoid(256)}`);

    this.closeModal = this.closeModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    const { password, passwordLength, passwordOverlay } = this.state;
    const cipher = this.#cipher;
    const newState = Object.assign({}, this.state);
    let pass = password.length > 0 ? cipher.decrypt(password) : "";
    // Optimization for deleting the whole password
    if (value.length === 0) {
      pass = "";
      newState.passwordOverlay = "";
    } else if (value.length > passwordLength) {
      let i = 0;
      let l = 0;
      value.split("").forEach((c, indx) => {
        const o = passwordOverlay.split("")[i];
        // console.log(o);
        // console.log(c);
        if (o !== c) {
          pass = pass.substring(0, indx) + c + pass.substring(indx);
          l += 1;
        } else {
          i += 1;
        }
      });
      newState.passwordOverlay += nanoid(l).substr(0, l);
    } else {
      let i = 0;
      let po = passwordOverlay;
      const rem = [];
      po = passwordOverlay
        .split("")
        .map((o, indx) => {
          const c = value.split("")[i];
          // console.log(o);
          // console.log(c);
          if (o !== c) {
            rem.push(indx);
            return null;
          }
          i += 1;
          return c;
        })
        .join("");
      pass = pass
        .split("")
        .map((c, indx) => (!rem.includes(indx) ? c : null))
        .join("");
      newState.passwordOverlay = po;
    }
    newState.passwordLength = pass.length;
    newState.password = newState.passwordLength > 0 ? cipher.encrypt(pass) : "";
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

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSubmit(event);
    }
  }

  render() {
    const {
      open,
      username,
      passwordOverlay,
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
              onKeyDown={this.handleKeyDown}
              id={usernameId}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
            <label htmlFor={passwordId}>Password:</label>
            <input
              type="password"
              name="password"
              value={passwordOverlay}
              onChange={this.handlePasswordChange}
              onKeyDown={this.handleKeyDown}
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
