import { useState } from "react";
import { Button } from "../Button/button";
import "./card.css";

/**
 * this component is a card that contains the user's image, name, email, phone number and location.
 * It also contains a button that allows you to display additional information about the user.
 * @param {Object} user - user data
 * @returns {JSX.Element} - card component
 */

export const Card = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card">
      <img src={user.picture.large} alt="user" />
      <h3>{`${user.name.title}  ${user.name.first} ${user.name.last}`}</h3>
      <p>{`Email : ${user.email}`}</p>
      {isExpanded && (
        <div className="additional-info">
          <p>{` Numéro de téléphone : ${user.phone}`}</p>
          <p>{` Localisation :  ${user.location.street.number} ${user.location.street.name}, ${user.location.street.city}, ${user.location.street.state}, ${user.location.street.country}, ${user.location.street.postcode}.`}</p>
        </div>
      )}
      <Button isExpanded={isExpanded} onClick={handleToggle} />
    </div>
  );
};
