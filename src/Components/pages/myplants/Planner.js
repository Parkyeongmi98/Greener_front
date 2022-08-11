import React, { useState } from 'react';
import MyplantsTab from './MyPlantsTab';
import Calendar from 'react-calendar';
import "../css/Planner.css";

function Planner() {

  const [value, onChange] = useState(new Date());


  return (
    <div>
        <MyplantsTab />
        
        <Calendar
        onChange={onChange}
        value={value}
      />




    </div>
  );
}

export default Planner;