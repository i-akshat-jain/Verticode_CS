// App.tsx
import logo from "./logo.png";
import React from 'react';
import IPerson from './models/Person';
import PersonForm from './PersonForm';

// Define the type for the submit function
type SubmitFunction = (person: IPerson) => IPerson;

function App() {
  const submit: SubmitFunction = (person: IPerson) => {
    // Mock estimatedScore calculation
    person.estimatedScore = Math.floor(Math.random() * 10) + 1;
    // console.log('Submitted Person:', person.estimatedScore);
    return person;
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto"> 
      <div className = "bg-light-green">
        <div className="icon  mb-4 p-4" > 
          <img src={logo} className="m-auto h-16" />
        </div>
      </div>
      <div className="personform p-20">
        <PersonForm submit={submit} />
      </div>
    </div>
    
  );
}

export default App;
