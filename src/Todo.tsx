import React, { useState, useEffect } from 'react';
import {
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core'

import {
  Add,
  Search
} from '@material-ui/icons'
import './Todo.css'
import api from './services/api'
import Card from './components/Card/index'
import Header from './components/Header/index'


interface Items{
  id: number,
  title:string,
  link:string,
  description:string,
  tags:[]
}

const Todo: React.FC = () => {
  const [items,setItems] = useState<Items[]>([]);
  const [showModal,setShowModal] = useState(false);
  useEffect(()=>{
    api.get('/tools').then(response => {
      console.log(response.data)
      setItems(response.data);
    })
  },[])

  function onHideModal(){
    setShowModal(false)
  }

  return (
    <>
      <Header title="VUTTR" description="Very Useful Tools to Remember"/>
      <div className="readOnly">
        <div className="search">
          <div className="search-icon">
            <Search className="search-icon2" />
          </div>
        <Input
        placeholder="Search..."
        classes={{
          root:"input-root",
          input:"input-input"
        }}
        inputProps={{"aria-label":"Search"}}
        />
          
        </div>
        <div className="cb">
        <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    value="checked"
                    color="secondary"
                  />
                }
                label="search in tags only"
              />
            </FormGroup>
        </div>
    
        <div className="addnew">
            <Button
                  aria-label="Add"
                  className="add-button"
                  onClick={()=>{setShowModal(true)}}
            >
                  <Add className="add-icon" />
                  Adicionar
            </Button>
        </div>
      
      </div>
      <Card items={items} />
    </>
  );
}

export default Todo;