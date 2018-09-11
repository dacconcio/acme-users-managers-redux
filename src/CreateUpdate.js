import React from 'react';

export default class CreateUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      managerId: 1,
      update: false
    };

    this.textChange = this.textChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  textChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.update) {
      this.props.updateFunc(
        this.props.location.state.id,
        this.state.name,
        this.state.managerId
      );
    } else {
      this.props.createFunc(this.state.name, this.state.managerId);
    }
  }

  selectChange(event) {
    const manager = this.props.users.filter(
      user => user.name === event.target.value
    );

    this.setState({ managerId: manager[0].id });
  }

  componentDidMount() {
    if (
      Number.isInteger(
        this.props.location.pathname.slice(
          this.props.location.pathname.length - 1
        ) * 1
      )
    ) {
      this.setState({ update: true });
    } else {
      this.setState({ update: false });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.textChange}
            type="text"
            value={this.state.name}
          />
          <select onChange={this.selectChange}>
            {this.props.users.map(user => {
              return <option key={user.id}>{user.name}</option>;
            })}
          </select>

          <input
            type="submit"
            value={this.state.update ? 'Update' : 'Create'}
          />
        </form>
      </div>
    );
  }
}
