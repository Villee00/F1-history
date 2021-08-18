import React from 'react';
import {Tab} from '@headlessui/react';

const AppBar = () =>{
  return(
    <Tab.Group vertical>
      <Tab.List className=" justify-between">
        <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Seasons</Tab>
        <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Circuits</Tab>
        <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Drivers</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default AppBar;