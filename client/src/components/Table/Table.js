import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { BASE_URL } from "../../constants";
import "./Table.scss";

const Table = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/csvlist`);
      setTableData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const downloadCsv = async path => {
    try {
      window.open(`${BASE_URL}api/getcsv?path=${path}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTableData();
  }, [props.tableReload]);
  return (
    <div className="tableContainer">
      <h1>CSV TABLE</h1>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Processed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            tableData?.length > 0 &&
            _.map(tableData, item => {
              return (
                <tr key={item.id}>
                  <td>{item.source_file_path.split("/").pop()}</td>
                  <td>{item.is_processed}</td>
                  <td>
                    <button
                      class="downloadButton"
                      onClick={() => downloadCsv(item.source_file_path)}
                    >
                      DOWNLOAD
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isLoading && "Loading..."}
    </div>
  );
};

Table.propTypes = {
  tableReload: PropTypes.string
};

export default Table;
