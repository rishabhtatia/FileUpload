import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { BASE_URL } from "../../constants";
import "./Table.css";

const Table = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/employees`);
      setTableData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <div>
      <h1>EMPLOYEE TABLE</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            tableData?.length > 0 &&
            _.map(tableData, item => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.age}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isLoading && "Loading..."}
    </div>
  );
};

export default Table;
