import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";
const limit = 10;

interface DataType {
  name: string;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "url",
    dataIndex: "url",
    key: "url",
  },
];

const Pagination: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>();
  const [isNextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);

  const getData = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const response = await axios.get(apiUrl, {
      params: {
        limit,
        offset,
      },
    });

    setNextBtnDisabled(offset + limit >= response.data.count);
    setDataSource(response.data.results);
  };

  useEffect(() => {
    getData(page, limit);
  }, [page]);

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      <Button onClick={() => setPage(page + 1)} disabled={isNextBtnDisabled}>
        Next
      </Button>
      {page}
    </>
  );
};
export default Pagination;
