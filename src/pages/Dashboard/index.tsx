import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  FormControl,
  Button,
  Card,
  Switch,
  CardContent,
  Typography,
  TextField,
} from "@material-ui/core";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FiTrash, FiPlus, FiX } from "react-icons/fi";
import { Add } from "@material-ui/icons";
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
  const [modalRemove, setModalRemove] = useState(false);
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

  useEffect(() => {
    loadTools();
  }, []);

  const handleSearch = (value: string) => {
    setTimeout(() => {
      setSearch(value);
    }, 1000);
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
    toast.success("Tools Created", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setItems([]);
    setShowModal(false);
    loadTools();
  }
  async function handleDeleteItem(id: Number) {
    try {
      await api.delete(`tools/${id}`);
      setModalRemove(false);
      loadTools();
    } catch (error) {
      console.log(error);
    }
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }
  const handleSwitchSearch = () => {
    setSearchTag(!searchTag);
  };
  async function loadTools() {
    const response = await api.get("/tools");
    const { data } = response;
    console.log(data);
    setItems(data);
  }
  return (
    <div>
      <Header title="VUTTR" description="Very Useful Tools to Remember" />
      <div className="fieldSearch">
        <div className="search">
          <FormControl>
            <TextField   onChange={(e) => handleSearch(e.target.value)} id="outlined-basic" label="Search" variant="outlined" />
          </FormControl>
          <Switch color="primary" checked={searchTag} onChange={handleSwitchSearch} />
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
            <Button
              onClick={() => {
                setModalRemove(!modalRemove);
              }}
            >
              <FiTrash />
            </Button>
            <Modal
              closeTimeoutMS={10}
              isOpen={modalRemove}
              className="modalremoved ReactModal__Overlay"
              onRequestClose={() => {
                setModalRemove(false);
              }}
            >
              <div className="bodymodalremoved">
                <div className="titleremoved">
                  <h1>Remove Tool</h1>
                  <FiX />
                </div>
                <p>Are you want to remote tool?</p>
                <div className="buttonsgroup">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setModalRemove(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Yes,Remove
                  </Button>
                </div>
              </div>
            </Modal>
          </Card>
        ))}

        <Modal
          className="modal"
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit}>
            <div className="headerform">
              <h1>Add New Tool</h1>
              <FiPlus size={24} />
            </div>
            <div className="form">
              <TextField
                id="multipline"
                label="Tool Name"
                name="title"
                className="field"
                variant="outlined"
                placeholder="Enter the name of the tool"
                multiline
                required
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                label="Tool Link"
                className="field"
                variant="outlined"
                placeholder="Enter tool link"
                name="link"
                required
                multiline
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                label="Tool Description"
                name="description"
                className="field"
                variant="outlined"
                placeholder="Describe the tool in a nutshell"
                multiline
                required
                onChange={handleInputChange}
              />
              <TextField
                id="standard-textarea"
                name="tags"
                label="Tags"
                className="field"
                variant="outlined"
                placeholder="Enter you tags"
                multiline
                required
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
