import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Range } from '../filters';
import * as actions from '../../actions';

const TEXT_FIELDS = [
  { label: 'Name', prop: 'name' }
];

class ArtistFilter extends Component {
  componentWillMount() {
   
  }

  componentDidMount() {
   
  }

  handleSubmit(formProps) {
   
  }

  renderInputs() {
    
  }

  render() {
   
    return (
      <div>ArtistFilter</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { filterCriteria } = state;

  return {
    yearsActive: filterCriteria.yearsActive,
    ageRange: filterCriteria.age,
    filters: state.form.filters && state.form.filters.values
  };
};

export default connect(mapStateToProps, actions)(reduxForm({
  destroyOnUnmount: false,
  form: 'filters',
  initialValues: { sort: 'name' }
})(ArtistFilter));
