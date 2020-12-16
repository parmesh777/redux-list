import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUsers, addUser } from "../actions/userActions";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import Pagination from "./Pagination";

//import {Link} from "react-router-dom"

class FrontPage extends Component {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },

    visible: false,
    search: "",
    currentId: "",
    errors: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    // direction: {
    //   firstName: "asc",
    //   lastName: "asc",
    //   age: "asc",
    //   gender: "asc",
    // },
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  onChange = (e) => {
    const { name, value } = e.target;

    if ([name] == "firstName") {
      this.setState({
        data: { ...this.state.data, firstName: value },
        errors: {
          ...this.state.errors,
          firstName: this.state.firstName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "lastName") {
      this.setState({
        data: { ...this.state.data, lastName: value },
        errors: {
          ...this.state.errors,
          lastName: this.state.lastName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "age") {
      this.setState({
        data: { ...this.state.data, age: value },
        errors: {
          ...this.state.errors,
          age: this.state.age === "" || null ? true : false,
        },
      });
    }
    if ([name] == "gender") {
      this.setState({
        data: { ...this.state.data, gender: value },
        errors: {
          ...this.state.errors,
          gender: this.state.gender === "" || null ? true : false,
        },
      });
    }
  };

  validate = () => {
    this.setState({
      errors: {
        firstName: this.state.data.firstName === "",
        lastName: this.state.data.lastName === "",
        age: this.state.data.age === "",
        gender: this.state.data.gender === "",
      },
    });
    return (
      this.state.data.firstName !== "" &&
      this.state.data.lastName !== "" &&
      this.state.data.age !== "" &&
      this.state.data.gender !== ""
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: this.state.data.id,
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,
      age: this.state.data.age,
      gender: this.state.data.gender,
    };

    if (!this.validate()) return;
    this.props.addUser(userData);

    this.setState({
      data: { id: "", firstName: "", lastName: "", age: "", gender: "" },

      visible: false,
    });
    window.location = "/";
    this.setState({ visible: this.validate() ? false : true });
  };

  // handleChange = (e) => {
  //   this.setState({ search: e.target.value });
  // };

  editUser = (currentUser) => {
    this.setState({
      data: { ...this.state.data, id: currentUser._id },
      visible: true,
    });
    axios
      .get("/api/users/" + currentUser._id)
      .then((res) => {
        this.setState({
          modalVisiblitiy: true,
          data: {
            ...this.state.data,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: res.data.age,
            gender: res.data.gender,
          },
        });
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  closeModal = () => {
    this.setState({
      data: { id: "", firstName: "", lastName: "", age: "", gender: "" },
      errors: { firstName: "", lastName: "", age: "", gender: "" },
      visible: false,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>User Entry Details</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                visible: !this.state.visible,
              });
            }}
          >
            Add Details
          </button>
        </div>

        <br />
        <br />
        <div>
          {this.state.visible && (
            <UserModal
              closeModal={this.closeModal}
              onChange={this.onChange}
              handleSubmit={this.handleSubmit}
              data={this.state.data}
              errors={this.state.errors}
            />
          )}

          <UsersTable
            search={this.state.search}
            editUser={this.editUser}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.items,
  newUser: state.users.item,
});

export default connect(mapStateToProps, { fetchUsers, addUser })(FrontPage);
