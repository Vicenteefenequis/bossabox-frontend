import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  InputAdornment,
  InputLabel,
  Input,
  FormControl,
  Checkbox,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@material-ui/core";
import { Search, Add, Home } from "@material-ui/icons";
import "./Todo.css";
import api from "./services/api";
import Header from "./components/Header/index";
import Modal from "react-modal";

interface Item {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string;
}

const Todo: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    api.get("/tools").then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { description, link, title, tags } = formData;

    const { data } = await api.post("/tools", {
      title,
      link,
      description,
      tags: tags.join(", "),
    });
    alert("Tools Created");
    window.location.reload(true);
  }
  return (
    <div>
      <Header title="VUTTR" description="Very Useful Tools to Remember" />
      <div className="fieldSearch">
        <div className="search">
          <FormControl className="classes.margin">
            <InputLabel htmlFor="input-with-icon-adornment">
              Oque Procura?
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Checkbox />
          Search is tags only
        </div>
        <div className="add-button">
          <Button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <Add />
            Add
          </Button>
        </div>
      </div>
      <div className="card">
        {items.map((item) => (
          <Card className="card-root">
            <CardContent>
              <Typography
                className="card-title"
                color="textSecondary"
                gutterBottom
              >
                <a target="_blank" href={item.link}>
                  {item.title}
                </a>
              </Typography>
              <Typography variant="h5" component="h2">
                {item.description}
              </Typography>
              <Typography className="card-pos" color="textSecondary">
                {item.tags} ,
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <TextField
                id="multipline"
                label="Tool Name"
                name="title"
                placeholder="Enter the name of the tool"
                multiline
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                label="Tool Link"
                placeholder="Enter tool link"
                name="link"
                multiline
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                label="Tool Description"
                name="description"
                placeholder="Describe the tool in a nutshell"
                multiline
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                name="tag"
                label="Tags"
                placeholder="Enter you tags"
                multiline
                onChange={handleInputChange}
              />
            </div>

            <div className="btn">
              <Button variant="contained" color="primary" type="submit">
                Add New Tool
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
