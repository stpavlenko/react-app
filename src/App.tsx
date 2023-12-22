import "./App.css";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  category: String;
  name: string;
  price: number;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    category: "Food",
    name: "Chips",
    tags: ["cheap", "tasty"],
    price: 50,
  },
  {
    key: "2",
    category: "Drink",
    name: "Soda",
    tags: ["fizzy", "refreshing"],
    price: 80,
  },
  {
    key: "3",
    category: "Clothing",
    name: "T-Shirt",
    tags: ["casual", "comfortable"],
    price: 25,
  },
  {
    key: "4",
    category: "Electronics",
    name: "Headphones",
    tags: ["wireless", "noise-cancelling"],
    price: 120,
  },
];

const App: React.FC = () => <Table columns={columns} dataSource={data} />;

export default App;
