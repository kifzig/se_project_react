import React from "react";
import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

/*
 * The **ToggleSwitch**component renders a switch used to toggle temperature units
 *
 *
 */

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggleswitch">
      <input
        type="checkbox"
        className="toggleswitch__checkbox"
        onChange={handleToggleSwitchChange}
      ></input>
      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggleswitch__slider toggleswitch__slider-F"
            : "toggleswitch__slider toggleswitch__slider-C"
        }
      ></span>
      <p
        className={`toggleswitch__temp-F ${
          currentTemperatureUnit === "F" && "toggleswitch__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggleswitch__temp-C ${
          currentTemperatureUnit === "C" && "toggleswitch__active"
        }`}
      >
        C
      </p>
    </label>
  );

  //   const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
  //     CurrentTemperatureUnitContext
  //   );
  //   const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  //   useEffect(
  //     () => setIsChecked(currrentTemperatureUnit === "C"),
  //     [currentTemperatureUnit]
  //   );
  //   return (
  //     <div className="toggle-switch">
  //       <label className="toggle-switch__label">
  //         <input
  //           className="toggle-switch_checkbox toggle-switch__checkbox_state_hidden"
  //           type="checkbox"
  //           name="toggle-switch-checkbox"
  //           value={currentTemperatureUnit}
  //           onChange={handleToggleSwitchChange}
  //           checked={isChecked}
  //         />
  //         <span className="toggle-switch__checkbox toggle-switch__checkbox_state_visible" />
  //       </label>
  //     </div>
  //   );
};

export default ToggleSwitch;
