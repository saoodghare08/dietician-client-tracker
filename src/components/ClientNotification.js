import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ClientSelector } from "../application/selectors/clientSelector";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ClientNotification component
const ClientNotification = () => {
  const clients = useSelector(ClientSelector) || [];
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const [today, setToday] = useState(new Date()); // State to store today's date

  // Update 'today' every 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 86400000); // 24 hours in milliseconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate the difference in days between today and a given date string
  const getDaysDifference = (dateString, todayDate) => {
    if (!dateString || typeof dateString !== "string") return null;

    const parts = dateString.split("/").map((part) => parseInt(part, 10));
    if (parts.length !== 3 || parts.some((part) => isNaN(part))) {
      console.error(`Invalid date format: ${dateString}. Expected "day/month/year".`);
      return null;
    }

    const [day, month, year] = parts;
    const date = new Date(year, month - 1, day); // Month is 0-based in JS
    if (isNaN(date.getTime())) {
      console.error(`Invalid date created from: ${dateString}`);
      return null;
    }

    const timeDiff = date - todayDate;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return Math.round(dayDiff);
  };

  // Determine the style for dates based on days difference
  const getDateStyle = (daysDifference) => {
    if (daysDifference === null) return { display: "none" };
    if (Math.abs(daysDifference) < 7) {
      return { color: "red", fontWeight: "bold" };
    }
    return { display: "none" }; // Hide dates outside 7-day window
  };

  // Check if a client has valid revision or end dates within 4 days
  const hasValidDates = (client) => {
    const checkDates = (dates) =>
      dates &&
      typeof dates === "string" &&
      dates.split(",").some((date) => {
        const daysDifference = getDaysDifference(date.trim(), today);
        return daysDifference !== null && Math.abs(daysDifference) < 4;
      });

    return checkDates(client.revisionDates) || checkDates(client.endDate);
  };

  // Render dates (revision or end) with day differences
  const renderDates = (dates, dateType, todayDate) => {
    if (!dates || typeof dates !== "string") {
      return <div><strong>{`No ${dateType} Dates Available`}</strong></div>;
    }

    const dateElements = dates
      .split(",")
      .map((date) => {
        const trimmedDate = date.trim();
        const daysDifference = getDaysDifference(trimmedDate, todayDate);
        const style = getDateStyle(daysDifference);

        if (daysDifference === null) return null;

        return (
          <div key={trimmedDate} style={style}>
            <strong>{`${dateType} Date:`}</strong> {trimmedDate}
            {" ("}
            {daysDifference >= 0
              ? `${daysDifference} days from today`
              : `${Math.abs(daysDifference)} days ago`}
            {")"}
          </div>
        );
      })
      .filter(Boolean); // Remove null entries from invalid dates

    return dateElements.length > 0 ? dateElements : null;
  };

  // Memoize filtered clients to improve performance
  const filteredClients = useMemo(() => {
    return clients.filter((client) => hasValidDates(client));
  }, [clients, today]);

  return (
    <div>
      {/* Notification button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Notifications
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <Dropdown.Menu show>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <Dropdown.Item key={client.name}>
                <strong>{client.name}</strong>
                {renderDates(client.revisionDates, "Revision", today)}
                {renderDates(client.endDate, "End", today)}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No notifications available</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default ClientNotification;