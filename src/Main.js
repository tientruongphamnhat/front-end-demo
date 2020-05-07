import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import fetch from 'cross-fetch';
import { Spinner } from 'react-bootstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      input: '',
      output: '',
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleTranslate = this.handleTranslate.bind(this);
  }

  handlechange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleTranslate() {
    if (!this.state.input) {
      return;
    }
    console.log(this.state.input);
    const input = this.state.input;
    this.setState({
      isLoading: true,
    });

    fetch('http://3.21.198.225/translate', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          this.setState({
            isLoading: false,
          });
          return false;
        }
        return response.json();
      })
      .then((response) => {
        console.log(response.output);
        this.setState({
          output: response.output,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <>
        <div className="col-xl-10 container">
          <div>
            <div className="text-center">
              <h1>Demo Mô Hình Dịch Máy Từ Tiếng Anh Sang Tiếng Việt</h1>
            </div>
          </div>
          <div className="row mt-5 text-center">
            <div className="col" style={{ fontSize: '28px' }}>
              Tiếng Anh
            </div>
            <div className="col" style={{ fontSize: '28px' }}>
              Tiếng Việt
            </div>
          </div>
          <div className="row mt-2 text-center">
            <div className="col" style={{ minHeight: '200px', height: 'auto' }}>
              <TextareaAutosize
                style={{
                  minHeight: '100%',
                  minWidth: '100%',
                  height: 'auto',
                  resize: 'vertical',
                }}
                name="input"
                placeholder="Enter text"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={this.state.input}
                onChange={this.handlechange}
              ></TextareaAutosize>
            </div>

            <div className="col" style={{ minHeight: '200px' }}>
              <TextareaAutosize
                value={this.state.output}
                onChange={this.handlechange}
                name="output"
                readOnly="true"
                style={{ minHeight: '100%', minWidth: '100%' }}
              ></TextareaAutosize>
            </div>
          </div>
          <div className="text-center mt-3">
            {this.state.isLoading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <button
                onClick={this.handleTranslate}
                className="btn btn-secondary"
              >
                Dịch
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Main;
