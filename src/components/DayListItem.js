import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//Rendered in dayList.js for each day indevidually
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
    data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{countSpots(spots)}</h3>
    </li>
  );
}
  const countSpots = spots => {
  let message = 
    spots > 1
      ? `${spots} spots remaining` //more than one spot or zero
      : spots === 0
      ? "no spots remaining"
      : `${spots} spot remaining`; // can only be one spot left
  return message
  };
