import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../css/App.css';

const Home = props => (
  <div className="App">
    <h1>Home</h1>
    <p>Welcome home!</p>
    <button onClick={() => props.changePage()}>Go to sign in page via redux</button>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/sign-in')
}, dispatch);

export default connect(
  null, 
  mapDispatchToProps
)(Home)