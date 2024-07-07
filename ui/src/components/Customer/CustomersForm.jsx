import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../features/customers/customerSlice";


export default function CustomersForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCustomer({
        name,
        email,
        city,
        state,
        country,
        phoneNumber,
      })
    );
    setName('');
    setEmail('');
    setCity('');
    setState('');
    setCountry('');
    setPhoneNumber('');
  }
  

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            City:
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            State:
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tel:
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </section>
  )
}
