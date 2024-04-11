import React, { useEffect, useState } from 'react';
import { allMemberships, buyMembership } from '../../Actions/memberships';
import { useDispatch, useSelector } from 'react-redux';
import './plans.css'; // Import CSS file

const Plans = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allMemberships());
  }, []);

  const [membership, setMembership] = useState('');

  function buyHandler() {
    dispatch(buyMembership(membership));
  }

  const memberships = useSelector((state) => state.membership.memberships);

  return (
    <div className="plans_main_container">
      <div className="plans_parent">
        {memberships && memberships.length > 0 && (
          <div className="plans_container">
            {memberships.map((element, index) => {
              return (
                <div key={index} className="plan_card">
                  <h3 className="plan_name">{element.membership_name}</h3>
                  <p className="plan_description">{element.membership_description}</p>
                  <button
                    onClick={() => {
                      setMembership(element.membership_name);
                      buyHandler();
                    }}
                    className="buy_button"
                  >
                    {element.membership_price} INR
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
