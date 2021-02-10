import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import { Table, Popconfirm, Select } from "antd";
import { ArrowRepeat } from "react-bootstrap-icons";
let groupesNotFiltered;
function GroupesTable() {
  const { fetchData, loading } = useHTTP();
  const [groupes, setGroupes] = useState();
  const [filiers, setFiliers] = useState();
  const { Option } = Select;
  const res = async () => {
    const data = await fetchData("group");
    setGroupes(data.groupes);
    groupesNotFiltered = data.groupes;
  };
  const Delete = async (id) => {
    await fetchData("group/" + id, "DELETE");
  };
  const getFiliers = async () => {
    const data = await fetchData("filier");
    setFiliers(data.filiers);
  };
  useEffect(() => {
    res();
    getFiliers();
  }, []);

  const Filter = (search) => {
    if (search) {
      setGroupes(groupesNotFiltered.filter((xs) => xs.filier._id === search));
    } else {
      setGroupes(groupesNotFiltered);
    }
  };
  const groupesTable = [
    {
      title: "Groupe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Filier",
      dataIndex: "filier",
      key: "filier",
      render: (text) => <div> {text.name}</div>,
    },
    {
      title: "Year",
      dataIndex: "createdAt",
      render: (text) => (
        <div>
          {new Date(text).getFullYear() +
            "/" +
            (new Date(text).getFullYear() + 1)}
        </div>
      ),
    },
    {
      title: "Action",
      key: "Action",
      dataIndex: "_id",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={Delete.bind(this, text)}
          okText="Yes"
          cancelText="No"
          onCancel={() => {}}
        >
          <a href="#" className="btn__link">
            Delete
          </a>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="mt-4">
      <div className="d-flex personneForm">
        <button className="btn__icon mb-3 mr-3" onClick={res}>
          <ArrowRepeat />
        </button>
        <div className="w-150">
          <Select
            className="input__form "
            placeholder="filier name"
            name="filier"
            onChange={Filter}
            allowClear
          >
            {filiers &&
              filiers.map((filier) => (
                <Option value={filier._id} key={filier._id}>
                  {filier.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>

      <div className="myTable">
        <Table
          columns={groupesTable}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
            defaultPageSize: 5,
          }}
          dataSource={groupes}
          loading={loading}
          rowKey={(d) => d._id}
          bordered
        />
      </div>
    </div>
  );
}

export default React.memo(GroupesTable);
