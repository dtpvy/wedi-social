import React, { Component } from "react";
import { Image, Box, Grid } from "@mantine/core";

export class Diagrams extends Component {
  render() {
    return (
      <div className="flex justify-around py-4 text-center">
        <div className="w-5/12 self-center">
          <img
            src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-line-charts/power-bi-line.png"
            alt="Random unsplash image"
          />
          <span className="py-3">Biểu đồ thể hiện lượng người truy cập</span>
        </div>
        <div className="w-5/12">
          <img
            src="https://www150.statcan.gc.ca/n1/edu/power-pouvoir/c-g/c-g05-2-1-eng.png"
            alt="Random unsplash image"
          />
          <span className="py-3">Biểu đồ thể hiện lượng người truy cập</span>
        </div>
      </div>
    );
  }
}

export default Diagrams;
