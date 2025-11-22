import React, { useEffect, useState } from 'react';
import SupportForm from './SupportForm';

const Support = () => {
  return (
    <div className="min-h-screen relative flex-col bg-green-600">
    <SupportForm setShowForm={setShowForm}/>

    </div>
  );
};

export default Support;