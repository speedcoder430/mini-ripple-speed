import React, { createContext, useContext, useState } from "react";

const DeviceFilterContext = createContext();

export const DeviceFilterProvider = ({ children }) => {
  const [blockedDevices, setBlockedDevices] = useState([]);
  const [blockedBrowsers, setBlockedBrowsers] = useState([]);

  const addDevice = (device) => {
    setBlockedDevices((prev) => (prev.includes(device) ? prev : [...prev, device]));
  };

  const removeDevice = (device) => {
    setBlockedDevices((prev) => prev.filter((d) => d !== device));
  };

  const addBrowser = (browser) => {
    setBlockedBrowsers((prev) => (prev.includes(browser) ? prev : [...prev, browser]));
  };

  const removeBrowser = (browser) => {
    setBlockedBrowsers((prev) => prev.filter((b) => b !== browser));
  };

  return (
    <DeviceFilterContext.Provider
      value={{
        blockedDevices,
        blockedBrowsers,
        addDevice,
        removeDevice,
        addBrowser,
        removeBrowser,
      }}
    >
      {children}
    </DeviceFilterContext.Provider>
  );
};

export const useDeviceFilter = () => useContext(DeviceFilterContext);
