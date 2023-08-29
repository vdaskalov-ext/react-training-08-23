import { Component, Fragment } from 'react';
import {Button} from "@mui/material";

interface Props {
  name?: string;
}

interface State {
  showName: boolean;
}

export class Hello extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showName: false,
    };

    // assumption
    // this.props = { ...this.defaultProps, ...props, ...{ name: 'some name' } };
  }

  static defaultProps = {
    name: 'World',
  };

  render() {
    // if (!this.state.showName) {
    //   return null;
    // }
    return (
      <Fragment>
        <div>Hello {this.state.showName && this.props.name}!</div>
        <div>
          <Button variant="outlined"
            onClick={() => this.setState({ showName: !this.state.showName })}
          >
            Toggle name
          </Button>
        </div>
      </Fragment>
    );
  }
}
