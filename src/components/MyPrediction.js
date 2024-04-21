import axios from "axios";
import { useRef } from "react";
import "./MyPrediction.css";
import React, { useState } from "react";
import Modal from "react-modal";
import theme from "./theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';

//For the ring loader
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 1; 
`;

//For the container box that's displayed after clicking predict
const StyledModal = styled(Modal)({
  margin: "10px",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});

const MyPrediction = () => {

  //Defining the state variable and refs for manage user input and api responses
  const [response, setResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalFeature, setModalFeature] = useState("");
  const age_reference = useRef();
  const hypertension_reference = useRef();
  const heart_disease_reference = useRef();
  const avg_glucose_level_reference = useRef();
  const feet_reference = useRef();
  const inch_reference = useRef();
  const weight_reference = useRef();
  const gender_reference = useRef();
  const married_reference = useRef();
  const work_reference = useRef();
  const residence_reference = useRef();
  const smoking_reference = useRef();
  const [feet, setFeet] = useState(0);
  const [inch, setInches] = useState(0);


  const my_prediction = async (e) => {
    e.preventDefault();
    setLoading(true); 
     
    //To calculate the bmi based on the weight and height given by the user
    setFeet(parseFloat(feet_reference.current.value));
    setInches(parseFloat(inch_reference.current.value));
    const feet = parseFloat(feet_reference.current.value);
    const inch = parseFloat(inch_reference.current.value);
    const height = (feet + inch / 12) * 0.3048;
    const weight = parseFloat(weight_reference.current.value);
    const bmi_reference = weight / (height * height);
    console.log(bmi_reference)

    //Define a function that stores all the value given as input by the user
    const personal_data = {
      age: age_reference.current.value,
      hypertension: hypertension_reference.current.value,
      heart_disease: heart_disease_reference.current.value,
      avg_glucose_level: avg_glucose_level_reference.current.value,
      bmi: bmi_reference,
      gender: gender_reference.current.value,
      married: married_reference.current.value,
      work: work_reference.current.value,
      residence: residence_reference.current.value,
      smoking: smoking_reference.current.value,
    };


    try {

      //Define a function named response which stores the output given by the api after 'personal data' has been passed to it
      const response = await axios.post("http://localhost:5000/predict",personal_data); 
      setResponse(response);
      console.log(response.data.result_message);

      try {
      
      // Find the feature with the highest contribution
        if (response.data.result_message === "Stroke") {  // Check if result_message is "Stroke" before displaying contributions
          const contributions = response.data.contributions;
          let message = "";
          let maxContrib = 0;
          let maxFeature = "";
          for (const feature in contributions) {
            message += `${feature}: ${contributions[feature]}%\n`;
            if (contributions[feature] > maxContrib) {
              maxContrib = contributions[feature];  // Update maxContrib and maxFeature if the current contribution is higher
              maxFeature = feature;
            }
          }
          setModalMessage(message);  // Display all contributions in a modal 
          if (maxFeature) {
            // Set the modal feature for conditional rendering
            setModalFeature(maxFeature);
            setIsModalOpen(true);
          }
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
    finally {
      setLoading(false);  // Ensure that loading is set to false even in case of an error
    }
  };

  const handleModalOpen = (feature) => {
    // Logic to set the title and content based on the feature
    setModalContent({
      title: "Feature Contribution",
      content: <pre>{modalMessage}</pre>,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);   //To close the modal
    setResponse(null);       //To erase the content of api after the modal is closed
  };  
  const [modalContent, setModalContent] = useState({
    title: "Feature Contributions",
    content: "checK check",
  });



  return (
    <>

      {/* for the box after clicking the predict button */}
      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Feature Contributions"
      >
       

      {/* IF THE RESPONSE IS STROKE */}
      {response && response.data.result_message === "Stroke" ? (
          <div>
            {/* Render different content based on the modalFeature */}

            {modalFeature === "bmi" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : ""}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h2>Stroke Detected</h2>
                  <br />
                  Dear user, it seems that you have high chance of stroke due to
                  your <b>high body mass index</b>. Having overweight or obesity
                  increases your risk for stroke. <br />
                  <br />
                  <b>Precautions:</b>
                  <br />- You can acquire healthy weight management techniques
                  by getting &nbsp; &nbsp; &nbsp;regular exercises and taking in
                  fewer calories. <br />
                  - You should follow a balanced diet rich in fruits,
                  vegetables, whole &nbsp; &nbsp; &nbsp;grains and lean
                  proteins.
                  <br /> - You can also avoid excessive consumption of sugary
                  and &nbsp; &nbsp; &nbsp;processed foods.
                  <br />- If you have any drinking habits you should cut them
                  off.
                </div>
              </Box>
            )}

            {modalFeature === "avg_glucose_level" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : "6"}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1>Stroke Detected</h1>
                  <br />
                  <div>
                    Dear user, it seems that you have quite <b>high average glucose
                    level value </b>.
                    <br />
                    <br />
                    <b>Precautions:</b>
                    <br />
                    - You can manage diabetes with lifestyle changes, such as
                    exercise and a low-sugar diet. <br />- You should follow a
                    balanced diet rich in fruits, vegetables, whole grains, lean
                    proteins, and healthy fats. <br />- Avoid excessive
                    consumption of sugary and processed foods, as they can cause
                    spikes in blood sugar levels.
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    alignSelf: "flex-right",
                    color: "#FCEFD0",
                    cursor: "pointer",
                  }}
                  onClick={handleModalClose}
                  size="2x"
                />
              </Box>
            )}

            {modalFeature === "age" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : ""}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1>Stroke Detected</h1>
                  <br />
                  Dear user, <b>age </b> seems to be the factor contributing to the
                  probability of you having a stroke. <br />
                  <br />
                  <b>Minimize the effect by:</b>
                  <br />
                  - Doing regular yogas
                  <br />
                  - Maintaining healthy diet
                  <br />
                  - Taking your medicines timely
                  <br />- Avoiding any unhealthy habits like drinking and
                  smoking.
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    alignSelf: "flex-right",
                    color: "#FCEFD0",
                    cursor: "pointer",
                  }}
                  onClick={handleModalClose}
                  size="2x"
                />
              </Box>
            )}

            {modalFeature === "hypertension" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : ""}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1>Stroke Detected</h1>
                  <br />
                  Dear user, you should focus on controlling your <b> blood
                  pressure </b>.
                  <br />
                  <br />
                  <b>Precautions:</b>
                  <br />
                  - Exercise regularly
                  <br />
                  - Eat less salt
                  <br />- You might also need to take prescription medications
                  to help lower your blood pressure and to reduce stress on your
                  blood vessels. <br />- If you take medicine to treat high
                  blood pressure follow your doctor’s instructions carefully.
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    alignSelf: "flex-right",
                    color: "#FCEFD0",
                    cursor: "pointer",
                  }}
                  onClick={handleModalClose}
                  size="2x"
                />
              </Box>
            )}

            {modalFeature === "smoking_status_smokes" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : ""}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1>Stroke Detected</h1>
                  <br />
                  Dear user, it seems that you have a history of{" "}
                  <b>smoking habit</b>
                  . Cigarette smoking greatly increases your chances of having a
                  stroke.
                  <br />
                  <br />
                  <b>Precautions:</b>
                  <br />- If you have quitted smoking,please don’t start <br />-
                  Obtain healthy ligestyle <br />
                  - Do some regular exercise and yoga
                  <br />- If you do smoke, quitting will be life saving as the
                  prediction shows that you have high chances of having stroke
                  due to smoking habit.
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    alignSelf: "flex-right",
                    color: "#FCEFD0",
                    cursor: "pointer",
                  }}
                  onClick={handleModalClose}
                  size="2x"
                />
              </Box>
            )}

            {modalFeature === "heart_disease" && (
              <Box
                className={`initial-box ${isModalOpen ? "pop" : ""}`}
                position="absolute"
                top="15%"
                left="25%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                height={500}
                width={800}
                bgcolor={theme.palette.primary.main}
                color={theme.palette.beigeColor.main}
                textAlign={"justified"}
                p={3}
                borderRadius="10px"
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <h1>Feature Contributions</h1>
                    <br />
                    <pre>{modalMessage}</pre>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h1>Stroke Detected</h1>
                  <br />
                  Dear user, our report shows that you have a high chace of
                  getting stroke due to <b>heart disease</b>. <br />
                  <br />
                  <b>Precautions:</b>
                  <br />
                  -If you have certain heart conditions, please do the checkups
                  on time and follow your doctor’s instructions carefully.{" "}
                  <br />
                  -Taking care of heart problems can help prevent stroke. <br />
                  -You can also do some light yoga and exercise to maintain your
                  health.
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    alignSelf: "flex-right",
                    color: "#FCEFD0",
                    cursor: "pointer",
                  }}
                  onClick={handleModalClose}
                  size="2x"
                />
              </Box>
            )}
          </div>
        ) 
        
        
        // IF THE RESULT IS NO STROKE
        : response && response.data.result_message === "No stroke" ? (
          <Box
            className={`initial-box ${isModalOpen ? "pop" : ""}`}
            position="absolute"
            top="20%"
            left="40%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            height={300}
            width={300}
            bgcolor={theme.palette.primary.main}
            color={theme.palette.beigeColor.main}
            textAlign={"justified"}
            p={3}
            borderRadius="10px"
          >
            <div>
              {/* Content to display when result_message is not "Stroke" */}
              <h1>No Stroke Detected</h1>
              <p>
                {" "}
                Congratulations! Based on the provided information, there is no
                indication of a stroke. Keep up the good work in maintaining a
                healthy lifestyle.{" "}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              style={{
                alignSelf: "flex-right",
                color: "#FCEFD0",
                cursor: "pointer",
              }}
              onClick={handleModalClose}
              size="2x"
            />
          </Box>
        ) : (
          <div>.</div>
        )}
      </StyledModal>


      {/* to display the input panel to the user and this part is connected to the prediction.css */}
      <div className="container0">
        <div className="container">
          <form onSubmit={my_prediction}>
            <table>
              <tbody>
                <tr className="row1">
                  <td className="f1">
                    <label>
                      Age:<br></br>{" "}
                    </label>{" "}
                  </td>
                  <td className="f1b">
                    <input
                      type="text"
                      placeholder="Input age"
                      ref={age_reference}
                    />{" "}
                  </td>

                  <td className="f2">
                    <label
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      Hypertension: <br></br>
                    </label>
                  </td>
                  <td className="f2b">
                    <select ref={hypertension_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </td>
                </tr>

                <tr className="row2">
                  <td className="f3">
                    <label>
                      Heart disease: <br></br>{" "}
                    </label>
                  </td>
                  <td className="f3b">
                    <select ref={heart_disease_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </td>
                  <td className="f4">
                    <label>
                      Average glucose label: <br></br>{" "}
                    </label>{" "}
                  </td>
                  <td className="f4b">
                    <input
                      type="text"
                      placeholder="in mg/dl"
                      ref={avg_glucose_level_reference}
                    />
                  </td>{" "}
                </tr>

                <tr className="row3">
                  <td className="f5">
                    <label>
                      Residence: <br></br>
                    </label>
                  </td>
                  <td className="f5b">
                    <select ref={residence_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="Rural">Rural</option>
                      <option value="Urban">Urban</option>
                    </select>
                  </td>

                  <td className="f6">
                    <label>
                      Gender: <br></br>{" "}
                    </label>
                  </td>
                  <td className="f6b">
                    <select ref={gender_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select <br></br>
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                </tr>

                <tr className="row4">
                  <td className="f7">
                    <label>
                      Marriage status: <br></br>
                    </label>
                  </td>
                  <td className="f7b">
                    <select ref={married_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="Yes">Married</option>
                      <option value="No">Not married</option>
                    </select>
                  </td>
                  <td className="f8">
                    <label>
                      Work type: <br></br>
                    </label>{" "}
                  </td>
                  <td className="f8b">
                    <select ref={work_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="Private">Private</option>
                      <option value="Self employed">Self employed</option>
                      <option value="Govt_job">Government Job</option>
                      <option value="children">Children</option>
                      <option value="Never_worked">Unemployed</option>
                    </select>
                  </td>{" "}
                </tr>

                <tr className="row5">
                  <td className="f9">
                    <label>
                      Weight <br></br>
                    </label>
                  </td>
                  <td className="f9b">
                    <input type="text" placeholder="in kg" ref={weight_reference} />{" "}
                  </td>

                  <td className="f10">
                    <label>
                      Smoking status: <br></br>
                    </label>{" "}
                  </td>
                  <td className="f10b">
                    <select ref={smoking_reference} defaultValue="">
                      <option value="" disabled hidden>
                        Select <br></br>
                      </option>
                      <option value="never smoked">Never Smoked</option>
                      <option value="formerly smoked">Formerly Smoked</option>
                      <option value="Unknown">Unknown</option>
                      <option value="smokes">Smokes</option>
                    </select>
                  </td>
                </tr>
                <tr className="row6">
                  <td className="f11">
                    <label>
                      Height : feet <br></br>
                    </label>
                  </td>
                  <td className="f11b">
                    <input type="text" placeholder="feet" ref={feet_reference} />{" "}
                  </td>

                  <td className="f12">
                    <label>
                    Height : inches <br></br>
                    </label>
                  </td>
                  <td className="f12b">
                    <input type="text" placeholder="inch" ref={inch_reference} />{" "}
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleModalOpen}>PREDICT</button>
          </form>
        </div>
      </div>

      {/* a spinner is loaded unless we get the result from the api */}
      {loading && (
        <div className="loading-spinner">
          <RingLoader css={override} size={1000} color={'white'} bgcolor={'#48817C'} loading={loading} />
        </div>
      )}

      
    </>
  );
};
export default MyPrediction;
