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
      outputColor: '',
      inputHeight: 200,
      outputHeight: 200,
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleTranslate = this.handleTranslate.bind(this);
    this.onRowChangeInputEvent = this.onRowChangeInputEvent.bind(this);
    this.onRowChangeOutputEvent = this.onRowChangeOutputEvent.bind(this);
  }

  handlechange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  onRowChangeInputEvent = (height) => {
    console.log(height);
    if (height > 200) {
      this.setState({
        inputHeight: height,
      });
    } else {
      this.setState({
        inputHeight: 200,
      });
    }
  };

  onRowChangeOutputEvent = (height) => {
    if (height > 200) {
      this.setState({
        outputHeight: height,
      });
    }
  };

  handleTranslate() {
    if (!this.state.input) {
      return;
    }
    console.log(this.state.input);
    const input = this.state.input;
    this.setState({
      isLoading: true,
    });

    fetch('http://34.87.103.230/translate', {
      //fetch('http://localhost:9999/translate', {
      //fetch('http://3.21.179.138/translate', {
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
            output: 'Có lỗi xảy ra, hãy thử lại sau',
            outputColor: 'red',
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
          outputColor: 'black',
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          output: 'Có lỗi xảy ra, hãy thử lại sau',
          outputColor: 'red',
        });
      });
  }

  render() {
    const { input, output, isLoading } = this.state;
    return (
      <>
        {/* <div className="container ">
          <p
            style={{
              fontSize: '30px',
              marginTop: '15px',
              color: '#006EFF',
              textAlign: 'center',
            }}
          >
            Mô Hình Dịch Máy Từ Tiếng Anh Sang Tiếng Việt
          </p>

          <div className="row mt-4">
            <div className="col text-center">
              <p style={{ fontSize: '28px' }}>Tiếng Anh</p>
              <div style={{ minHeight: '200px', height: 'auto' }}>
                <TextareaAutosize
                  style={{
                    minHeight:
                      this.state.inputHeight > this.state.outputHeight
                        ? this.state.inputHeight
                        : this.state.outputHeight,
                    minWidth: '100%',
                    resize: 'vertical',
                    fontSize: '20px',
                    borderColor: '#D3D3D3',
                    padding: '10px',
                    overflow: 'hidden',
                  }}
                  name="input"
                  placeholder="Nhập nội dung"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  value={input}
                  onChange={this.handlechange}
                  onHeightChange={this.onRowChangeInputEvent}
                ></TextareaAutosize>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              className="col-sm-1"
            >
              <div>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <button
                    onClick={this.handleTranslate}
                    className="btn btn-secondary"
                    style={{ width: '100%', background: '#006EFF' }}
                  >
                    Dịch
                  </button>
                )}
              </div>
            </div>

            <div className="col text-center">
              <p style={{ fontSize: '28px' }}>Tiếng Việt</p>
              <div style={{ minHeight: '200px' }}>
                <TextareaAutosize
                  value={output}
                  onChange={this.handlechange}
                  name="output"
                  readOnly={true}
                  onHeightChange={this.onRowChangeOutputEvent}
                  style={{
                    minHeight:
                      this.state.outputHeight > this.state.inputHeight
                        ? this.state.outputHeight
                        : this.state.inputHeight,
                    minWidth: '100%',
                    fontSize: '20px',
                    borderColor: '#D3D3D3',
                    padding: '10px',
                    color: this.state.outputColor,
                  }}
                ></TextareaAutosize>
              </div>
            </div>
          </div>
        </div> */}
        <div className="text-center">
          <p
            style={{
              fontSize: '30px',
              marginTop: '15px',
              color: '#006EFF',
              textAlign: 'center',
            }}
          >
            Mô Hình Dịch Máy Từ Tiếng Anh Sang Tiếng Việt
          </p>
          <hr />
          <div style={{ height: '500px' }}>
            <div className="container">
              <div
                className="row d-flex justifyContent-center flex-nowrap"
                style={{
                  border: '1',
                  borderColor: '#D3D3D3',
                }}
              >
                <p
                  className="col "
                  style={{
                    fontSize: '24px',
                    text_align: 'center',
                  }}
                >
                  Tiếng Anh
                </p>
                <p className="col-1">&nbsp;</p>
                <p
                  className="col"
                  style={{
                    fontSize: '24px',
                    text_align: 'center',
                  }}
                >
                  Tiếng Việt
                </p>
              </div>
              <div
                className="row mt-1 mb-3"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextareaAutosize
                  className="col-sm shadow-none rounded"
                  style={{
                    minHeight:
                      this.state.inputHeight > this.state.outputHeight
                        ? this.state.inputHeight
                        : this.state.outputHeight,

                    resize: 'vertical',
                    fontSize: '20px',
                    borderColor: '#D3D3D3',
                    padding: '10px',
                    overflow: 'hidden',
                    outline: 0,
                  }}
                  name="input"
                  placeholder="Nhập nội dung"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  value={input}
                  onChange={this.handlechange}
                  onHeightChange={this.onRowChangeInputEvent}
                ></TextareaAutosize>
                <div
                  className="col-sm-1 my-2 "
                  style={{
                    alignSelf: 'center',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    <button onClick={this.handleTranslate} className="btn">
                      <i
                        className="fas fa-arrow-right"
                        style={{ fontSize: '40px' }}
                      ></i>
                    </button>
                  )}
                </div>
                <TextareaAutosize
                  className="col-sm shadow-none rounded"
                  value={output}
                  onChange={this.handlechange}
                  name="output"
                  readOnly={true}
                  onHeightChange={this.onRowChangeOutputEvent}
                  style={{
                    minHeight:
                      this.state.outputHeight > this.state.inputHeight
                        ? this.state.outputHeight
                        : this.state.inputHeight,

                    fontSize: '20px',
                    borderColor: '#D3D3D3',
                    padding: '10px',
                    color: this.state.outputColor,
                    outline: 0,
                    resize: 'vertical',
                    overflow: 'hidden',
                  }}
                ></TextareaAutosize>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
