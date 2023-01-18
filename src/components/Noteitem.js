import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quod quo neque voluptatum laborum? Esse
            voluptatibus assumenda dolore architecto quos iure commodi
            laudantium, tempore harum impedit, aliquam ipsa fugiat at?
            Reiciendis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
