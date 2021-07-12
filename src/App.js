import React, { Component } from 'react'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Style.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      name: '',
      email: '',
      dateOfBirth: '',
      profession: '',
      id: 0
    }
  }

  componentDidMount() {

    axios.get('http://localhost:4000/users').then(result => {

      this.setState({
        users: result.data
      })
    })
  }

  addInformation = (ent, id) => {

    if (this.state.id === 0) {

      axios.post('http://localhost:4000/users', { name: this.state.name, email: this.state.email, dateOfBirth: this.state.dateOfBirth, profession: this.state.profession })
        .then(() => {
          this.componentDidMount();
        })
    } else {

      axios.put(`http://localhost:4000/users/${id}`, { name: this.state.name, email: this.state.email, dateOfBirth: this.state.dateOfBirth, profession: this.state.profession })
        .then(() => {
          this.componentDidMount();
        })
    }

  }
  DeleteInformation = (ent, id) => {

    axios.delete(`http://localhost:4000/users/${id}`).then(() => {

      this.componentDidMount();
    })
  }
  EditInformation = (ent, id) => {

    axios.get(`http://localhost:4000/users/${id}`).then(result => {

      this.setState({

        name: result.data.name,
        email: result.data.email,
        dateOfBirth: result.data.dateOfBirth,
        profession: result.data.profession,
        id: result.data.id
      })
    })
  }

  nameChange = (ent) => {

    this.setState({
      name: ent.target.value
    })
  }
  emailChange = (ent) => {

    this.setState({
      email: ent.target.value
    })
  }

  dateOfBirthChange = (ent) => {

    this.setState({
      dateOfBirth: ent.target.value
    })
  }

  professionChange = (ent) => {

    this.setState({
      profession: ent.target.value
    })
  }


  render() {

    const { users } = this.state

    return (
      <div className="Container">

        <form onSubmit={(ent) => this.addInformation(ent, this.state.id)}>

          <div className="form-group border">
            <level><b>Name </b></level>
            <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(ent) => this.nameChange(ent)} />
          </div>

          <div className="form-group border">
            <level><b>Email </b></level>
            <input type="email" name="email" placeholder="email" value={this.state.email} onChange={(ent) => this.emailChange(ent)} />
          </div>

          <div className="form-group border">
            <level><b>DataOfBirth </b></level>
            <input type="text" name="DateOfBirth" placeholder="DateOfBirth" value={this.state.dateOfBirth} onChange={(ent) => this.dateOfBirthChange(ent)} />
          </div>

          <div className="form-group border">
            <level><b>Profession </b></level>
            <input type="text" name="profession" placeholder="profession" value={this.state.profession} onChange={(ent) => this.professionChange(ent)} />
          </div>

          <input type="submit" className="p-1 m-3 btm btm-defult" Value={this.state.id === 0 ? 'Submit' : 'Update'} />
        </form>
        <table className="table table-border text-center">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DateOfBirth</th>
              <th>Profession</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <thead>

            {users.map(user => (
              <tr className="OutputBorder">
                <td> {user.id}  </td>
                <td> {user.name}  </td>
                <td> {user.email}  </td>
                <td> {user.dateOfBirth}  </td>
                <td> {user.profession}  </td>
                <td > <button onClick={(ent) => this.DeleteInformation(ent, user.id)}> delete </button>  </td>
                <td> <button onClick={(ent) => this.EditInformation(ent, user.id)}> edit </button>  </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    )
  }
}

export default App;
