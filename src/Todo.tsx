import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  InputLabel,
  Input,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import "./Todo.css";
import api from "./services/api";
import Card from "./components/Card/index";
import Header from "./components/Header/index";

interface Items {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: [];
}

const Todo: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    api.get("/tools").then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  }, []);

  function onHideModal() {
    setShowModal(false);
  }

  return (
    <>
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
          <Add />
          Add
        </div>
      </div>
      <Card items={items} />
    </>
  );
};

export default Todo;
