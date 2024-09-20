
  import React, { useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import { useDispatch, useSelector } from 'react-redux';
  import { createMeal, reset } from '@/features/meals/mealSlice';
  import BackButton from '@/components/Backbutton';

  const MealOrderForm = () => {
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('Chennai');
    const [mealType, setMealType] = useState([]);
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const router = useRouter();

    const { isLoading, isError, isSuccess } = useSelector((state) => state.meals);

      const [userNameError,setUserNameError]=useState('');
      const [genderError,setGenderError]=useState('');
      const [emailError,setEmailError]=useState('');
      const [phoneNumberError,setPhoneNumberError]=useState('');
      const [locationError,setLocationError]=useState('');
      const [mealTypeError,setMealTypeError]=useState('');
      const [dateError,setDateError]=useState('')
    useEffect(() => {
      return () => {
        dispatch(reset());
      };
    }, [dispatch]);

    useEffect(() => {
      if (isSuccess) {
        alert('Meals order created Successfully')
        router.push('/dashboard');
      } else if (isError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: "Couldn't place the order. Please try again."
        }));
      }
    }, [isSuccess, isError, router]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'userName') setUserName(value);
      else if(name==='gender') setGender(value)
      else if (name === 'email') setEmail(value);
      else if (name === 'phoneNumber') setPhoneNumber(value);
      else if (name === 'location') setLocation(value);
      else if (name === 'date') setDate(value);


    };
    const countryCodes = [
      { code: '+91', name: 'India' },
      { code: '+1', name: 'USA' },
      { code: '+44', name: 'UK' },
      { code: '+61', name: 'Australia' },
    ];
    const handleCountryCodeChange = (e) => {
      setCountryCode(e.target.value);
    };
  

    const handleRadioChange = (e) => {
      setGender(e.target.value);
    };

    const handleCheckboxChange = (e) => {
      const { value } = e.target;
      setMealType((prevMealType) =>
        prevMealType.includes(value)
          ? prevMealType.filter((meal) => meal !== value)
          : [...prevMealType, value]
      );
    };
     const handleBlur = (e) => {
      const { name } = e.target;
    
      // UserName Validation
      if (name === 'userName') {
        if (!userName) {
          setUserNameError('UserName is Required');
        } else if (userName.length > 20) {
          setUserNameError('User name cannot exceed 20 characters');
        } else if (!/^[A-Za-z][A-Za-z0-9_#]*$/.test(userName) || !/\d/.test(userName)) {
          setUserNameError('User name must start with a letter, contain at least one number, and include at least one underscore (_) or hash (#)');
        } else if (/^\d/.test(userName)) {
          setUserNameError('User name cannot start with a number');
        } else {
          setUserNameError('');
        }
      }
    
      // Gender Validation
      if (name === 'gender') {
        if (!gender) {
          setGenderError('Gender is required');
        } else {
          setGenderError('');
        }
      }
    
     // Email Validation
if (name === 'email') {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  const atSymbolCount = (email.match(/@/g) || []).length;
  const plusSymbolIndex = email.indexOf('+');
  const atSymbolIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');
  const domain = email.substring(atSymbolIndex + 1, dotIndex);

  // Required field
  if (!email) {
    setEmailError('Email is required');
  } 
  // Maximum length of 250 characters
  else if (email.length > 250) {
    setEmailError('Email should not exceed 250 characters');
  } 
  // Email must contain exactly one '@'
  else if (atSymbolCount !== 1) {
    setEmailError("Email must contain exactly one '@'");
  } 
  // '+' should only be before '@' and at least one character must be between '+' and '@'
  else if (plusSymbolIndex !== -1 && (plusSymbolIndex >= atSymbolIndex || plusSymbolIndex === 0 || atSymbolIndex - plusSymbolIndex <= 1)) {
    setEmailError("The '+' symbol must appear only before '@' and there should be at least one character between '+' and '@'");
  } 
  // At least 3 characters before '@'
  else if (atSymbolIndex < 3) {
    setEmailError("There must be at least 3 characters before '@'");
  } 
  // Valid format (must match the pattern of a valid email)
  else if (!emailRegex.test(email)) {
    setEmailError('Invalid email format. Example: example+test@gmail.com');
  } 
  // At least 3 characters after '@' before the dot '.'
  else if (domain.length < 3) {
    setEmailError("There must be at least 3 characters after '@' before the dot '.'");
  } 
  // At least 1 character between '@' and '.'
  else if (dotIndex - atSymbolIndex <= 1) {
    setEmailError("There must be at least one character between '@' and '.'");
  } 
  // The dot part must be 2 or 3 characters
  else if (dotIndex + 2 > email.length || dotIndex + 4 < email.length) {
    setEmailError("The domain after the dot must be 2 or 3 characters (e.g., '.com' or '.net')");
  } 
  // If all checks pass, clear any error messages
  else {
    setEmailError('');
  }
}

    
      // Phone Number Validation (optional)
      if (name === 'phoneNumber') {
        const phoneRegex = /^[0-9]{10}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
          setPhoneNumberError('Phone number must be 10 digits');
        } else {
          setPhoneNumberError('');
        }
      }
    
      // Location Validation
      if (name === 'location') {
        if (!location) {
          setLocationError('Location is required');
        } else {
          setLocationError('');
        }
      }
    
      // Meal Type Validation (only if mealType exists in form)
      if (name === 'mealType' && mealType.length === 0) {
        setMealTypeError('At least one meal type must be selected');
      } else {
        setMealTypeError('');
      }
    
      // Date Validation
      if (name === 'date') {
        if (!date) {
          setDateError('Date is required'); 
        } else {
          setDateError('');
        }
      }
    };
    
  
const handleSubmit = (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Validate each field and set error messages
  if (!userName) {
    setUserNameError('User name is required');
    isValid = false;
  } else if (userName.length > 20) {
    setUserNameError('User name cannot exceed 20 characters');
    isValid = false;
  } else if (!/^[A-Za-z][A-Za-z0-9_#]*$/.test(userName) || !/\d/.test(userName)) {
    setUserNameError('User name must start with a letter, contain at least one number, and include at least one underscore (_) or hash (#)');
    isValid = false;
  } else if (/^\d/.test(userName)) {
    setUserNameError('User name cannot start with a number');
    isValid = false;
  } else {
    setUserNameError('');
  }

  // Gender Validation
  if (!gender) {
    setGenderError('Gender is required');
    isValid = false;
  } else {
    setGenderError('');
  }

 // Email Validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,3}$/;
const atSymbolCount = (email.match(/@/g) || []).length;
const plusIndex = email.indexOf('+');
const atIndex = email.indexOf('@');
const dotIndex = email.lastIndexOf('.');
const domain = email.substring(atIndex + 1, dotIndex);

// Validation checks
if (!email) {
  setEmailError('Email is required');
  isValid = false;
} else if (email.length > 250) {
  setEmailError('Email should not exceed 250 characters');
  isValid = false;
} else if (atSymbolCount !== 1) {
  setEmailError("Email must contain exactly one '@'");
  isValid = false;
} else if (plusIndex !== -1 && (plusIndex >= atIndex || plusIndex === 0 || atIndex - plusIndex <= 1)) {
  setEmailError("The '+' symbol must only appear before '@' and at least one character must be between '+' and '@'");
  isValid = false;
} else if (atIndex < 3) {
  setEmailError("There must be at least 3 characters before '@'");
  isValid = false;
} else if (!emailRegex.test(email)) {
  setEmailError('Invalid email format. Example: example+test@gmail.com');
  isValid = false;
} else if (domain.length < 3) {
  setEmailError("There must be at least 3 characters after '@' before the dot '.'");
  isValid = false;
} else if (dotIndex - atIndex <= 1) {
  setEmailError("There must be at least one character between '@' and '.'");
  isValid = false;
} else {
  setEmailError('');
}

  
  // Location Validation
  if (!location) {
    setLocationError('Location is required');
    isValid = false;
  } else {
    setLocationError('');
  }

  // Meal Type Validation
  if (mealType.length === 0) {
    setMealTypeError('At least one meal type must be selected');
    isValid = false;
  } else {
    setMealTypeError('');
  }

  // Date Validation
  if (!date) {
    setDateError('Date is required');
    isValid = false;
  } else {
    setDateError('');
  }

  // If all fields are valid, dispatch the meal data
  if (isValid) {
    const mealData = {
      userName,
      gender,
      email,
      phoneNumber: phoneNumber ? `+91${phoneNumber}` : '',
      location,
      mealType,
      date,
    };

    dispatch(createMeal(mealData));
  }
};


 

    const getAvailableMealTypes = () => {
      const mealOptions = {
        Chennai: ['Breakfast', 'Lunch'],
        Erode: ['Lunch', 'Dinner'],
        Coimbatore: ['Breakfast', 'Lunch', 'Dinner'],
      };
      return mealOptions[location] || [];
    };

    return (
      <>
        <BackButton />
        <form onSubmit={handleSubmit} className="meal-order-form">
          <h2>Meal Order Form</h2>

          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {userNameError && <p style={{color:"red"}}>{userNameError }</p>}
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={handleRadioChange}
                  onBlur={handleBlur}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={handleRadioChange}
                  onBlur={handleBlur}
                />
                Male
              </label>
            </div>
           {genderError && <p style={{color:'red'}}>{genderError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>  
           
        <div className="form-group">
          <label htmlFor='phoneNumeber'>Phone Number: </label>
          <select
            value={countryCodes}
            onChange={handleCountryCodeChange}
            className="country-code-dropdown"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="1234567890"
          />
           {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
        </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <select id="location" name="location" value={location} onChange={handleInputChange} onBlur={handleBlur}>
              <option value="Chennai">Chennai</option>
              <option value="Erode">Erode</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
            {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
          </div>


  <div className="form-group">
    <label>Meal Type:</label>
    <div className="checkbox-group horizontal-checkbox-group">
      {getAvailableMealTypes().map((meal) => (
        <label key={meal}>
          <input
            type="checkbox"
            value={meal}
            checked={mealType.includes(meal)}
            onChange={handleCheckboxChange}
            onBlur={handleBlur}
          />
          {meal}
        </label>
      ))}
    </div>
    {mealTypeError && <p style={{ color: 'red' }}>{mealTypeError}</p>}
  </div>


          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
                {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
          </div>

          <button type="submit" disabled={isLoading} className='submit-button'>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
          {errors.submit && <span className="error">{errors.submit}</span>}
        </form>
      </>
    );
  };

  export default MealOrderForm;

/*Sure! Let’s break down the `handleCheckboxChange` function line by line.

### Code Breakdown

```javascript
const handleCheckboxChange = (e) => {
```
- **Purpose**: This line defines a function named `handleCheckboxChange` that takes an event (`e`) as an argument. This function will handle changes in the checkbox input.

---

```javascript
  const { value } = e.target;
```
- **Purpose**: This line uses destructuring to extract the `value` property from the `target` of the event (`e`). 
- **`e.target`** refers to the checkbox input that triggered the change event, and `value` represents the value associated with that checkbox (e.g., "Breakfast", "Lunch", etc.).

---

```javascript
  setMealType((prevMealType) =>
```
- **Purpose**: This line calls the `setMealType` function to update the state of the `mealType`.
- **`prevMealType`** is the current state of `mealType` before the update. The function passed to `setMealType` takes `prevMealType` as its argument.

---

```javascript
    prevMealType.includes(value)
```
- **Purpose**: This checks whether the `value` (the checkbox value) is already included in the `prevMealType` array.
- **Returns**: A boolean (`true` or `false`):
  - `true` if the value is already selected (present in the array).
  - `false` if it is not selected.

---

```javascript
      ? prevMealType.filter((meal) => meal !== value)
```
- **Purpose**: This is the "true" branch of the conditional (ternary) operator.
- **Action**: If the value is already in the array (`true`), it filters out that value:
  - `prevMealType.filter(...)` creates a new array that includes all meals except the one matching `value`.
- **Example**: If `prevMealType` was `["Breakfast", "Lunch"]` and the user unchecked "Lunch", it would return `["Breakfast"]`.

---

```javascript
      : [...prevMealType, value]
```
- **Purpose**: This is the "false" branch of the conditional operator.
- **Action**: If the value is not already in the array (`false`), it creates a new array that includes all existing meals plus the newly selected meal:
  - `...prevMealType` spreads the existing meal types into a new array.
  - `value` adds the newly selected meal to the array.
- **Example**: If `prevMealType` was `["Breakfast"]` and the user checked "Lunch", it would return `["Breakfast", "Lunch"]`.

---

### Summary

In summary, this function allows for toggling meal types based on user interactions with checkboxes:

- **If the checkbox is checked**: The meal type is added to the state.
- **If the checkbox is unchecked**: The meal type is removed from the state.

The function effectively updates the `mealType` state based on whether the associated checkbox is currently selected or not.*/


/*Sure! Let's break down the `getAvailableMealTypes` function line by line, focusing on each part.

### Code Breakdown

```javascript
const getAvailableMealTypes = () => {
```
- **Purpose**: This line defines a function named `getAvailableMealTypes` using an arrow function syntax. It doesn't take any parameters.

---

```javascript
  const mealOptions = {
```
- **Purpose**: Here, a constant variable `mealOptions` is declared. It holds an object that maps different locations to their available meal types.

---

```javascript
    Chennai: ['Breakfast', 'Lunch'],
    Erode: ['Lunch', 'Dinner'],
    Coimbatore: ['Breakfast', 'Lunch', 'Dinner'],
```
- **Purpose**: These lines define the key-value pairs within the `mealOptions` object:
  - **Keys**: `Chennai`, `Erode`, and `Coimbatore` represent different locations.
  - **Values**: Each key maps to an array of meal types available in that location:
    - **Chennai**: Offers "Breakfast" and "Lunch".
    - **Erode**: Offers "Lunch" and "Dinner".
    - **Coimbatore**: Offers "Breakfast", "Lunch", and "Dinner".

---

```javascript
  return mealOptions[location] || [];
```
- **Purpose**: This line returns the available meal types based on the current `location` state.
- **How It Works**:
  - **`mealOptions[location]`**: Looks up the array of meal types for the current value of `location`. If `location` is "Chennai", it will return `['Breakfast', 'Lunch']`.
  - **`|| []`**: If `location` is not one of the keys in `mealOptions` (or if it’s undefined), it defaults to returning an empty array (`[]`).
  
---

### Summary

In summary, the `getAvailableMealTypes` function retrieves an array of meal types based on the current `location`. If the `location` doesn’t match any key in the `mealOptions` object, it returns an empty array. This ensures that the function always provides a valid output for the meal types, even if the location isn't recognized.*/