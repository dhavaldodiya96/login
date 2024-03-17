import React, { useEffect, useState } from "react";

const Deshboard = () => {
  const [companyKeyValueList, setCompanyKeyValueList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [searchValue, setSearchValue] = useState([]);

  let token = localStorage.getItem("token");
  let loginid = localStorage.getItem("loginId");

  useEffect(() => {
    fetchData();
  }, []);

  const filterSearchList = () => {
    if (filterText) {
      const list = companyKeyValueList.filter((item) =>
        item.feature_key.toLowerCase().includes(filterText)
      );
      setSearchValue(list);
    }
  };

  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://erphomeapi.azurewebsites.net/CompanyProfile/GET_CompanyProfile_KeyValue",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            MyToken: token,
            loginID: loginid,
          },
        }
      );
      let data = await response.json();
      setCompanyKeyValueList(data?.result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterSearch = (event) => {
    setFilterText(event.target.value);
    filterSearchList();
  };

  return (
    <div className="tableContainer">
      <h4 className="tableHeading">Company Profile Key Values</h4>
      <div className="searchInput">
        <label>searchInput</label>
        <input type="text" value={filterText} onChange={filterSearch} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company Key</th>
              <th>Company Values</th>
            </tr>
          </thead>
          <tbody>
            {!filterText &&
              companyKeyValueList.map((item, index) => (
                <tr key={index}>
                  <td>{item.feature_key}</td>
                  <td>{item.feature_value}</td>
                </tr>
              ))}

            {searchValue.map((listadd, index) => (
              <tr key={index}>
                <td>{listadd.feature_key}</td>
                <td>{listadd.feature_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Deshboard;
