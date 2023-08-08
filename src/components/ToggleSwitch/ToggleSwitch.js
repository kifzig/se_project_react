import React from "react";
import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

/*
 * The **ToggleSwitch**component renders a switch used to toggle temperature units
 *
 *
 */

const ToggleSwitch = () => {
  console.log("Toggle ");
  return <div>Toggle Switch</div>;

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
