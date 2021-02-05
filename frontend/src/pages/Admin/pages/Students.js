import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import { Table, Input, Button, Space } from "antd";
import PersonneForm from "../components/PersonneForm";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  ArrowRepeat
} from "react-bootstrap-icons";
function Students() {
  const { fetchData, loading } = useHTTP();
  const [students, setStudents] = useState();
  let searchInput;
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataToModel , setDataToModel ] = useState();
  const OpenModal = () => {
    setDataToModel({})
    setOpen(!open);
  };
  const res = async () => {
    const data = await fetchData("student");
    setStudents(data.students);
  };

  useEffect(() => {
    res();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className="bg__P color__white"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();

    setSearchText("");
  };
  const StudentTable = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Groupe",
      dataIndex: "groupe",
      key: "groupe",
      render: (text) => <div> {text.name}</div>,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Action",
      key: "Action",
      render: (text, record) => (
        <Space size="middle">
          <button className="btn__link" onClick={()=>{ setDataToModel(text) ; setOpen(true)}}>Edit</button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="table__container component">
      <button className="btn__icon mr-2" onClick={res}>
          <ArrowRepeat />
        </button>
        <button className="btn__primary" onClick={OpenModal}>
          Add
        </button>
        <div className="myTable">
          <Table
            columns={StudentTable}
            pagination={{ showSizeChanger: true }}
            dataSource={students}
            bordered
            loading={loading}
            rowKey={(d) => d._id}
          />
        </div>
      </div>
      {open && <PersonneForm open={open} OpenModal={OpenModal} DataToModel={dataToModel} />}
    </div>
  );
}

export default React.memo(Students);
