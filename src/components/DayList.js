import React from "react";
import DayListItem from "./DayListItem"

//DayList component to hold multiple days
export default function DayList(props) {
  const {setDay, day, days} = props;
  const dayListItem = days.map(({id, name, spots}) => {
  return ( 
    <DayListItem 
      key={id}
      name={name} 
      spots={spots} 
      selected={name === day}
      setDay={setDay} 
    />
   );
  })
  
  return <ul>{dayListItem}</ul>
}
