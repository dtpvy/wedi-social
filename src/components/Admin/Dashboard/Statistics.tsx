import React, { Component } from "react";

export class Statistics extends Component {
  render() {
    return (
      <div className="mt-5">
        <div className="flex justify-around text-center font-medium">
          <div className="bg-cyan-200 p-4 rounded-lg w-72">
            <p className="text-lg">123</p>
            Lượt truy cập
          </div>
          <div className="bg-indigo-200 p-4 rounded-lg w-72">
            <p className="text-lg">123</p>
            Request
          </div>
          <div className="bg-fuchsia-200 p-4 rounded-lg w-72">
            <p className="text-lg">123</p>
            Địa điểm
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
