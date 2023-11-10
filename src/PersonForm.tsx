// PersonForm.tsx
import React, { useState } from 'react';
import IPerson from "./models/Person";
import './styles.css'; // Import the CSS file

// Define the type for the submit function
type SubmitFunction = (person: IPerson) => IPerson;

interface PersonFormProps {
  submit: SubmitFunction;
}

const PersonForm: React.FC<PersonFormProps> = ({ submit }) => {
  // State to manage form data
  const [person, setPerson] = useState<IPerson>({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    job: '',
    bio: '',
    location: {
      city: '',
      country: '',
      long: '',
      lat: '',
    },
    estimatedScore: 0,
  });

  // State to track form submission status
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedPerson, setSubmittedPerson] = useState<IPerson | undefined>(undefined);

  // Handle form submission
  const handleSubmit = () => {
    // Call the submit function passed as a prop and pass the form data
    const submittedPerson = submit(person);

    // Set formSubmitted to true to hide the form
    setFormSubmitted(true);
    setSubmittedPerson(submittedPerson);
  };

  // JSX for the form
  return (
    <div className="container">
      <div className="form-container">
        {formSubmitted ? (
          <div className="success-card">
            <p className="success-message">Form submitted successfully!</p>
            <div style={{ marginTop: '10px', textAlign: 'left' }}>
              <p>First Name: {person.firstName}</p>
              <p>Last Name: {person.lastName}</p>
              <p>Date of Birth: {person.dateOfBirth.toISOString().split('T')[0]}</p>
              <p>Job: {person.job}</p>
              <p>Bio: {person.bio}</p>
              <p>City: {person.location.city}</p>
              <p>Country: {person.location.country}</p>
              <p>Estimated Score: {submittedPerson?.estimatedScore}</p>
            </div>
          </div>
        ) : (
          <form className="form">
            <label>
              First Name:
              <input
                type="text"
                value={person.firstName}
                onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={person.lastName}
                onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={person.dateOfBirth.toISOString().split('T')[0]}
                onChange={(e) => setPerson({ ...person, dateOfBirth: new Date(e.target.value) })}
              />
            </label>
            <label>
              Job:
              <select
                value={person.job}
                onChange={(e) => setPerson({ ...person, job: e.target.value as IPerson['job'] })}
              >
                <option value="Firefighter">Firefighter</option>
                <option value="Police Officer">Police Officer</option>
                <option value="Astronaut">Astronaut</option>
                <option value="Developer">Developer</option>
              </select>
            </label>
            <label>
              Bio:
              <textarea
                value={person.bio}
                onChange={(e) => setPerson({ ...person, bio: e.target.value })}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={person.location.city}
                onChange={(e) => setPerson({ ...person, location: { ...person.location, city: e.target.value } })}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={person.location.country}
                onChange={(e) => setPerson({ ...person, location: { ...person.location, country: e.target.value } })}
              />
            </label>
            <button
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonForm;
