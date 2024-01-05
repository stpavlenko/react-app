import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../global-styles";

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

const TableActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--m-default);
  gap: var(--m-default);
`;

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
      <TableActionsWrapper>
        <StyledButton onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </StyledButton>
        <StyledButton
          onClick={() => setPage(page + 1)}
          disabled={isNextBtnDisabled}
        >
          Next
        </StyledButton>
        <span className="page">{page}</span>
      </TableActionsWrapper>
    </>
  );
};
export default Pagination;
