import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const { selected, spots, name} = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  return (
    <li 
    className={dayClass}
    onClick={() => props.setDay(name)}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
  const formatSpots = spots => {
  let message = 
    spots > 1
      ? `${spots} spots remaining` //either more than one spot or zero
      : spots === 0
      ? "no spots remaining"
      : `${spots} spot remaining`; // can only be one spot left
  return message
  };
