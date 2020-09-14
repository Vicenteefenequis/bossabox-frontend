import React, { useState, useEffect, ChangeEvent, FormEvent,useCallback, useRef } from "react";
import {
  Switch,
} from "@material-ui/core";
import * as Yup from "yup";
import { Add } from "@material-ui/icons";
import api from "../../services/api";
import Header from "../../components/Header/index";
import { 
  Card , 
  InputSearch , 
  ContainerItemsFromMenu, 
  GroupSearch ,
  TypographyBody,
  TypographyDescription,
  ContainerCard,
  ModalController
} from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Modal from "react-modal";
import getValidationErrors from "../../utils/getValidationError";
import { FormHandles } from "@unform/core";
import {Form} from "@unform/web";
import { displayPartsToString } from "typescript";
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
  const formRef = useRef<FormHandles>(null);

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

  const handleSubmt = useCallback(async(data:Item) => {
    try{
      console.log("CHEGUEI")
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required("Titulo obrigatorio"),
        description: Yup.string().required("Descrição obrigatoria"),
        link: Yup.string().required("Link obrigatorio"),
        tags: Yup.string().required("Tag obrigatoria"),
      });
      await schema.validate(data,
        {abortEarly:false}
      );
      await api.post("/tools", data);
      setShowModal(false);

    }catch(err){
      const erros = getValidationErrors(err)
      console.log(erros);
      formRef.current?.setErrors(erros);
    }


  }, [items]);

  /*async function handleSubmit(event: FormEvent) {
    try{
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
  
      const validate = await schema.validate(data,
        {abortEarly:false}
      );

      await api.post("/tools", data);
     
     
      loadTools();
    } catch(err){
      setError(true);
    }
   
  }*/
  async function handleDeleteItem(id: Number) {
    try {
      await api.delete(`tools/${id}`);
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
    <>
      <Header title="VUTTR" description="Very Useful Tools to Remember" />
      <ContainerItemsFromMenu>
        <GroupSearch>
          <InputSearch placeholder="Search.." onChange={e => handleSearch(e.target.value)} />

            <div style={{display:'flex'}}>
              <Switch color="primary" checked={searchTag} onChange={handleSwitchSearch} />
              <p>Search is tag only</p>
            </div>

            <Button color={"blue"}
            onClick={() => {
              setShowModal(!showModal);
            }}
            >
            <Add color="disabled" />
            <h4>Add</h4>
          </Button>
        </GroupSearch>
         
        </ContainerItemsFromMenu>
      <ContainerCard>
          <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} ariaHideApp={false}>
            <Form ref={formRef} onSubmit={handleSubmt}>
              <h1 style={{color:"#170C3A"}}>Add new tool</h1>
              <Input name="title" placeholder="Enter your title" />
              <Input name="link" placeholder="Enter your link"/>
              <Input name="description" placeholder="Enter your description"/>
              <Input name="tags" placeholder="Enter your tags"/>
              <Button type="submit">Add Tools</Button>
          </Form>
        </Modal>
      </ContainerCard>
    </>
  );
};

export default Dashboard;
