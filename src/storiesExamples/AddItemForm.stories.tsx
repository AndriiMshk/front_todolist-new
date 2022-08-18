import React from 'react';
import { AddItemForm } from "../components/common/components/AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions';

export default {
  title: 'AddItemForm',
  component: AddItemForm
}

const callBack = action('Button pressed')

export const AddItemFormExample = () => {
  return <AddItemForm onClick={callBack}/>
}