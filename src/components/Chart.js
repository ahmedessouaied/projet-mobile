import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ title, data, dataKey, color }) => (
  <div className="h-72">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mois" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
