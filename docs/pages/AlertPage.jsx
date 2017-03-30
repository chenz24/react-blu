import React from 'react';
import { Alert, Notify } from '../../src';

class AlertPage extends React.Component {

  handleOnClose() {
    Notify.info({
      content: 'close notification',
    });
  }

  render() {
    return (
      <div className="content" style={{ height: '10000px' }}>
        <h2>Alert 警告框</h2>
        <div className="box box-demo">
          <Alert>
            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
          </Alert>
          <hr />
          <Alert type="info">
            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
          </Alert>
          <hr />
          <Alert type="primary" closable={true} title="ultricies nec, pellentesque eu" onClose={this.handleOnClose}>
            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
          </Alert>
          <hr />
          <Alert type="primary" title="ultricies nec, pellentesque eu" icon="facebook" animated={true}>
            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            </p>
          </Alert>

        </div>
      </div>
    );
  }
}

export default AlertPage;
