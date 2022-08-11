// import React from 'react';
// import CommunityTab from './CommunityTab';

// function Talk() {
//     return (
//         <>
//         <CommunityTab />
//         <h1>소통페이지</h1>
//         </>
//     )
// }

// export default Talk;

import React from "react";
import Todo from "../../../Todo";
import AddTodo from "../../../AddTodo";
import { Paper, List, Container } from "@material-ui/core";
import { todo } from "../../../service/ApiService";
import CommunityTab from './CommunityTab';

class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    todo("/todo/list", "GET", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  add = (item) => {
    todo("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    todo("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => {
    todo("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );                                                                                                       };

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    // 3. props로 넘겨주기
    return (
      <div>
        <CommunityTab />
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default Talk;