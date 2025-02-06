import { useState } from "react";
import styles from "./menuItem.module.scss";
import { Table, Button } from "antd";

const MenuItem = ({ sections = [], onEdit, onDelete, onAdd }) => {

  const columns = [
    {
      title: "Book",
      dataIndex: "book",
      key: "book",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Publication Year",
      dataIndex: "publicationYear",
      key: "publicationYear",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button onClick={() => onEdit(record.key)}>Edit</Button>
          <Button onClick={() => onDelete(record.key) } style={{ marginLeft: 8 }}>Delete</Button>
        </span>
      ),
    },
  ];

  const dataSource = sections.map((section, index) => ({
    key: section._id,
    book: `Book ${index + 1}`,
    title: section.title || "N/A",
    author: section.author || "N/A",
    publicationYear: section.publicationYear || "N/A",
    isbn: section.isbn || "N/A",
  }));

  return (
    <div className={styles.containerMenu}>
      <div className={styles.boxMenu}>
        <Button onClick={onAdd} style={{ marginBottom: 16 }}>Add</Button>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default MenuItem;
