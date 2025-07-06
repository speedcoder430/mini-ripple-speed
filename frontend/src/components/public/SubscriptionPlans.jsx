// SubscriptionPlans.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanCard from './PlanCard';

const SubscriptionPlans = ({ userPlanId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/plans`);
        setPlans(data.filter(plan => plan._id === userPlanId));
      } catch (err) {
        console.error('Error fetching plan', err);
      }
    };
    fetchPlans();
  }, [userPlanId]);

  return (
    <div className="flex justify-center mt-4">
      {plans.map(plan => (
        <PlanCard key={plan._id} plan={plan} isSelected={true} />
      ))}
    </div>
  );
};
export default SubscriptionPlans;
