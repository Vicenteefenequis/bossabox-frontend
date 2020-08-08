import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import * as Yup from "yup";
import { FiTrash } from "react-icons/fi";
import { Search, Add } from "@material-ui/icons";
import "./styles.css";
import api from "../../services/api";
import Header from "../../components/Header/index";
import Modal from "react-modal";

interface Item {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}
interface FormData {
  title: string;
  link: string;
  description: string;
  tags: string;
}

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [searchTag, setSearchTag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    link: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (searchTag) {
      api.get(`/tools?tags_like=${search}`).then((response) => {
        setItems(response.data);
      });
    } else {
      api.get(`/tools?q=${search}`).then((response) => {
        setItems(response.data);
      });
    }
  }, [searchTag, search]);

  async function loadTools() {
    const response = await api.get("tools");
    const { data } = response;
    setItems(data);
  }

  useEffect(() => {
    loadTools();
  }, []);

  async function handleDeleteItem(id: Number) {
    try {
      await api.delete(`tools/${id}`);
      loadTools();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (value: string) => {
    setTimeout(() => {
      setSearch(value);
    }, 1000);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }
  const handleSwitchSearch = () => {
    setSearchTag(!searchTag);
  };

  async function handleSubmit(event: FormEvent) {
    const schema = Yup.object().shape({
      title: Yup.string().required("Titulo obrigatorio"),
      description: Yup.string().required("Descrição obrigatoria"),
      link: Yup.string().required("Link obrigatorio"),
      tags: Yup.string().required("Tag obrigatoria"),
    });

    const { description, link, title, tags } = formData;

    const arrayTags = tags.split(",").map((e) => e.replace(/\s/g, ""));
    console.log(arrayTags);
    const data = {
      title,
      link,
      description,
      tags: arrayTags,
    };

    await schema.validate(data);
    await api.post("/tools", data);
    alert("Tools Created");
    setItems([]);
    setShowModal(false);
    loadTools();
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
              onChange={(e) => handleSearch(e.target.value)}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Checkbox checked={searchTag} onChange={handleSwitchSearch} />
          <p className="tag">Search is tags only</p>
        </div>
        <div className="add-button">
          <Button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <Add />
            <h4>Add</h4>
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
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  {item.title}
                </a>
              </Typography>
              <h2 className="description">{item.description}</h2>
              <Typography className="card-pos" color="textSecondary">
                {item.tags.map((tag) => (
                  <span> #{tag}</span>
                ))}
              </Typography>
            </CardContent>
            <Button onClick={() => handleDeleteItem(item.id)}>
              <FiTrash />
            </Button>
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
                name="tags"
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

export default Dashboard;
