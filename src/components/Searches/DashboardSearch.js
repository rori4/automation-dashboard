import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Badge,
  Row,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Moment from "react-moment";
import { handleError, handleInfo } from "../../utils/customToast";

export default class DashboardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: props.search
    };
  }

  async retrieveData(search) {
    const { service } = this.props;
    try {
      let result = await service.all({ search });
      if (result.success) {
        this.setState({
          data: result.data,
          isLoading: false
        });
      } else {
        handleInfo(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  componentDidMount() {
    this.retrieveData(this.props.search);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.search !== nextProps.search) {
      this.retrieveData(nextProps.search);
    }
  }

  render() {
    const { data } = this.state;
    const { headerText, isLoading } = this.props;
    return (
      <Card>
        <CardHeader>{headerText}</CardHeader>
        <CardBody>
          <Table hover responsive className="table-outline mb-0 d-sm-table">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Title</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                this.loading
              ) : (
                <Fragment>
                  {data.map((item, key) => (
                    <tr key={key}>
                      <td className="text-center">
                        <div className="book-list">
                          <img src={item.cover} className="img-book" />
                        </div>
                      </td>
                      <td>
                        <a href={item.url}>
                          <div>{item.title}</div>
                        </a>
                        <div className="small text-muted">
                          Created On:{" "}
                          <Moment format="LL">{item.createdOn}</Moment>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
