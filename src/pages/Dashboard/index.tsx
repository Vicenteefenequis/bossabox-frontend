import React, { useState, useEffect,useCallback, useRef } from "react";
import {
  Switch,
} from "@material-ui/core";
import * as Yup from "yup";
import { Add,DeleteForever } from "@material-ui/icons";
import api from "../../services/api";
import Header from "../../components/Header/index";
import { 
  Card , 
  InputSearch , 
  ContainerItemsFromMenu, 
  GroupSearch ,
  ContainerCard,
  ModalController
} from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Modal from "react-modal";
import getValidationErrors from "../../utils/getValidationError";
import { FormHandles } from "@unform/core";
import {Form} from "@unform/web";
import {motion} from 'framer-motion';


interface Item {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}


const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [searchTag, setSearchTag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

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

  const handleSubmit = useCallback(async(data:Item) => {
    try{
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
  async function handleDeleteItem(id: Number) {
    try {
      await api.delete(`tools/${id}`);
      loadTools();
    } catch (error) {
      console.log(error);
    }
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
              <strong>Search is tag only</strong>
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
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1 style={{color:"#170C3A"}}>Add new tool</h1>
              <Input name="title" placeholder="Enter your title" />
              <Input name="link" placeholder="Enter your link"/>
              <Input name="description" placeholder="Enter your description"/>
              <Input name="tags" placeholder="Enter your tags"/>
              <Button type="submit">Add Tools</Button>
          </Form>
        </Modal>
      </ContainerCard>
      <ModalController>
        <motion.ul
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
        >

                {items.map((it,index) => (
                    <motion.li key={index} className="item" variants={item}>
                      <Card >
                        <div>
                          <h1>{it.title}</h1>
                          <div className="btnGroup">
                            <DeleteForever/>
                            <p>Remover</p>
                          </div>
                        </div>
                        <h4>{it.description}</h4>
                        <span>{it.tags}</span>
                      </Card>
                    </motion.li>
                ))}

        </motion.ul>
      </ModalController>

    </>
  );
};

export default Dashboard;
