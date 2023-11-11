// PersonForm.tsx
import React, { useState } from 'react';
import IPerson from "./models/Person";
import './styles.css'; 

// Define the type for the submit function
type SubmitFunction = (person: IPerson) => IPerson;

interface PersonFormProps {
  submit: SubmitFunction;
}
const initialLocation = {
  city: '',
  country: '',
  long: '',
  lat: '',
};
const PersonForm: React.FC<PersonFormProps> = ({ submit }) => {
  const [errors, setErrors] = useState<Partial<IPerson>>({});
  // State to manage form data
  const [person, setPerson] = useState<IPerson>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    job: '',
    bio: '',
    location: initialLocation,
    estimatedScore: 0,
  });


const validateForm = () => {
  const newErrors: Partial<IPerson> = {};

  // Check if values are filled
  if (!person.firstName.trim()) {
    newErrors.firstName = 'First Name is required';
  }
  if (!person.lastName.trim()) {
    newErrors.lastName = 'Last Name is required';
  }
  if (!person.dateOfBirth) {
    newErrors.dateOfBirth = 'Date of Birth is required';
  }
  if (!person.job) {
    newErrors.job = 'Job is required';
  }
  if (!person.bio.trim()) {
    newErrors.bio = 'Bio is required';
  }
  if (!person.location.lat?.trim()) {
    newErrors.location = { ...newErrors.location, lat: 'Lattitude is required' };
  }
  if (!person.location.long?.trim()) {
    newErrors.location = { ...newErrors.location, long: 'Longitude is required' };
  }
  if (!person.location.city?.trim()) {
    newErrors.location = { ...newErrors.location, city: 'City is required' };
  }
  if (!person.location.country?.trim()) {
    newErrors.location = { ...newErrors.location, country: 'Country is required' };
  }
  const latPattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  const longPattern = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
   if (!latPattern.test(person.location.lat!.trim())) {
    newErrors.location = { ...newErrors.location, lat: 'Invalid latitude format' };
  }

  if (!longPattern.test(person.location.long!.trim())) {
    newErrors.location = { ...newErrors.location, long: 'Invalid longitude format' };
  }

  setErrors(newErrors);

  // Return true if there are no errors
  return Object.keys(newErrors).length === 0;
};
  // State to track form submission status
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedPerson, setSubmittedPerson] = useState<IPerson | undefined>(undefined);

  // Handle form submission
  const handleSubmit = () => {
    // Call the submit function passed as a prop and pass the form data
    if (validateForm()) {
      const submittedPerson = submit(person);
      setFormSubmitted(true);
      setSubmittedPerson(submittedPerson);
    } else {
      // display a general error message
      // alert('Please fill in all required fields.');
    }
  };

  // JSX for the form
  return (
    <div className="container">
      <div className="form-container">
        {formSubmitted ? (
          <div className="success-card">
            <p className="success-message">Form submitted successfully!</p>
            <div style={{ marginTop: '10px', textAlign: 'left', marginBottom:'20px'}}>
              <p>First Name: {person.firstName}</p>
              <p>Last Name: {person.lastName}</p>
              <p>Date of Birth: {person.dateOfBirth.split('T')[0]}</p>
              <p>Job: {person.job}</p>
              <p>Bio: {person.bio}</p>
              <p>Lat, Long: {person.location.lat}, {person.location.long}</p>
              <p>City: {person.location.city}</p>
              <p>Country: {person.location.country}</p>
              <p>Estimated Score: {submittedPerson?.estimatedScore}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormSubmitted(false);
                setSubmittedPerson(undefined);
                setPerson({
                  firstName: '',
                  lastName: '',
                  dateOfBirth: '',
                  job: '',
                  bio: '',
                  location: initialLocation,
                  estimatedScore: 0,
                });
                setErrors({});
              }}
            >
              Submit Form Again
            </button>
          </div>
        ) : (
          <form className="form">
            <label>
              First Name:*
              <input
                type="text"
                value={person.firstName}
                onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
              />
              {errors.firstName && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.firstName}</p>}
            </label>
            <label>
              Last Name:*
              <input
                type="text"
                value={person.lastName}
                onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
              />
              {errors.lastName && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.lastName}</p>}
            </label>
            <label>
            Date of Birth:*
            <input
              type="date"
              value={person.dateOfBirth.split('T')[0]}
              onChange={(e) => {
                try {
                  const isoDateString = new Date(e.target.value).toISOString();
                  setPerson({ ...person, dateOfBirth: isoDateString });
                  if (errors.dateOfBirth) {
                    setErrors({ ...errors, dateOfBirth: undefined });
                  }
                } catch (error) {
                  setErrors({ ...errors, dateOfBirth: 'Invalid date format' });
                }
              }}
            />
            {errors.dateOfBirth && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.dateOfBirth}</p>}
          </label>
            <label>
              Job:*
              <select
                value={person.job}
                onChange={(e) => setPerson({ ...person, job: e.target.value as IPerson['job'] })}
              >
                <option value="">--Select--</option>
                <option value="Firefighter">Firefighter</option>
                <option value="Police Officer">Police Officer</option>
                <option value="Astronaut">Astronaut</option>
                <option value="Developer">Developer</option>
              </select>
            
             {errors.job && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.job}</p>}
            </label>
            <label>
              Bio:*
              <textarea
                value={person.bio}
                onChange={(e) => setPerson({ ...person, bio: e.target.value })}
              />
            {errors.bio && <p className="error-message" style={{ color: 'red' , fontSize: '14px'}}>{errors.bio}</p>}
            </label>
            <label>
              Latitude:
              <input
                type="text"
                value={person.location.lat}
                onChange={(e) => setPerson({ ...person, location: { ...person.location, lat: e.target.value } })}
              />
              {errors.location?.lat && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.location.lat}</p>}
            </label>
            <label>
              Longitude:
              <input
                type="text"
                value={person.location.long}
                onChange={(e) => setPerson({ ...person, location: { ...person.location, long: e.target.value } })}
              />
              {errors.location?.long && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.location.long}</p>}
            </label>
           <label>
          City:
          <input
            type="text"
            value={person.location.city}
            onChange={(e) => setPerson({ ...person, location: { ...person.location, city: e.target.value } })}
          />
          {errors.location?.city && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.location.city}</p>}
        </label>
          <label>
            Country:
            <input
              type="text"
              value={person.location.country}
              onChange={(e) => setPerson({ ...person, location: { ...person.location, country: e.target.value } })}
            />
            {errors.location?.country && <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.location.country}</p>}
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
