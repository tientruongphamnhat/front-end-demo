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

    //fetch('http://localhost:9999/translate', {
    fetch('http://3.21.179.138/translate', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
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
        var outputResponse = String(response.output);
        //outputResponse = outputResponse.replace(/ {1}?/g, '?');
        //outputResponse = outputResponse.replace(/ ./g, '.');
        //outputResponse = outputResponse.replace(/ {2}/g, ' ');
        console.log(outputResponse);
        this.setState({
          output: outputResponse,
          isLoading: false,
        });
      });
  }

  render() {
    const { input, output, isLoading } = this.state;
    return (
      <>
        <div className="col-xl-10 container">
          <div>
            <div className="text-center">
              <p
                style={{
                  fontSize: '30px',
                  marginTop: '15px',
                  color: '#006EFF',
                }}
              >
                Demo Mô Hình Dịch Máy Từ Tiếng Anh Sang Tiếng Việt
              </p>
            </div>
          </div>
          <div className="row mt-2 text-center">
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
                  fontSize: '20px',
                  borderColor: '#D3D3D3',
                  padding: '10px',
                }}
                name="input"
                placeholder="Nhập nội dung"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={input}
                onChange={this.handlechange}
              ></TextareaAutosize>
            </div>

            <div className="col" style={{ minHeight: '200px' }}>
              <TextareaAutosize
                value={output}
                onChange={this.handlechange}
                name="output"
                readOnly={true}
                style={{
                  minHeight: '100%',
                  minWidth: '100%',
                  borderColor: '#D3D3D3',
                  padding: '10px',
                }}
              ></TextareaAutosize>
            </div>
          </div>
          <div className="text-center mt-3">
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <button
                onClick={this.handleTranslate}
                className="btn btn-secondary"
                style={{ width: '500px', background: '#006EFF' }}
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
