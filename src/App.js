import React, {Component, useState} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

// export default function App() {
//   const [token, setToken] = useState('');
//
//   console.log('1')
//   fetch('/s4ode/Api/Session/Logon', {
//     method: 'POST',
//     headers: {"Content-Type": "application/json; charset=utf-8"},
//     body: JSON.stringify({company: "DemoCompany", user: "Admin", password: "Demo2020"})
//   })
//     .then(resp => {
//       console.log('======success search request=======', resp);
//       processResp(resp);
//       // return fetch('/s4ode/Api/Data/GetSummary', {
//       //   headers: {
//       //     key: token
//       //   }
//       // });
//       console.log('token', token)
//     })
//     .catch(err => {
//       console.log('======failure=======');
//       console.log(err);
//     });
//
//   function processResp(resp) {
//     resp.blob().then(re => {
//       var FR = new FileReader();
//       FR.onload = event => {
//         //console.log(FR.result);
//         setToken(FR.result);
//       };
//       FR.readAsText(re);
//     });
//   }
//
//   return (<div className="root2">1</div>);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {}
    };
  }

  componentDidMount() {
    fetch('/Logon', {
      method: 'POST',
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify({company: "DemoCompany", user: "Admin", password: "Demo2020"})
    })
      .then(resp => {
        console.log('======success search request=======');
        this.processResp(resp);
      })
      .then(resp=>{
        resp.json().then(json=> console.log(json))
      })
      // .then(todos => {
      //   console.log('======success todos request=======', todos);
      //   todos.json().then(json => console.log(json));
      //   return axios.get('/posts');
      // })
      // .then(posts => {
      //   console.log('======success posts request=======');
      //   console.log(posts);
      // })
      .catch(err => {
        console.log('======failure=======');
        console.log(err);
      });
  }

  processResp(resp) {
    resp.blob().then(re => {
      var FR = new FileReader();
      FR.onload = event => {
        this.setState({ token: FR.result })
        console.log(JSON.parse(FR.result).Token)
        fetch('/GetSummary', {
          headers: {
            key: FR.result//JSON.parse(FR.result).Token
          }
        })
          .then(fo=> {
            fo.json().then(json=> console.log(json))
          })
      };
      FR.readAsText(re);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;