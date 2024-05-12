import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../global-styles";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 10;

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

  const decreasePage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  const increasePage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const getData = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const response = await axios.get(API_URL, {
      params: {
        limit,
        offset,
      },
    });

    setNextBtnDisabled(offset + limit >= response.data.count);
    setDataSource(response.data.results);
  };

  useEffect(() => {
    getData(page, LIMIT);
  }, [page]);

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="name" scroll={{ x: true }} />
      <TableActionsWrapper>
        <StyledButton onClick={decreasePage} disabled={page <= 1}>
          Previous
        </StyledButton>
        <StyledButton onClick={increasePage} disabled={isNextBtnDisabled}>
          Next
        </StyledButton>
        <span>{page}</span>
      </TableActionsWrapper>
    </>
  );
};
export default Pagination;
