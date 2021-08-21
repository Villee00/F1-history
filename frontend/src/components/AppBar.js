import React from 'react';
import {Tab} from '@headlessui/react';
import { Link } from 'react-router-dom';
import SeasonCard from './SeasonCard';

const AppBar = () =>{
  return(
    <div>
      <Link to="/">
        <p className="text-5xl font-bold font text-center">F1</p>
      </Link>
      <Tab.Group vertical>
        <Tab.List className=" justify-between">
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Seasons</Tab>
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Circuits</Tab>
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 ">Drivers</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel><SeasonCard/></Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AppBar;