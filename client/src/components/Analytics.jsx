import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.scss";
import Navbar from "./Navbar";

const formatFileSize = (size) => {
  const fileSizeInMB = (size / (1024 * 1024)).toFixed(2);
  return `${fileSizeInMB} MB`;
};

const formatStorageUsage = (usage) => {
  const storageUsageInMB = (usage / (1024 * 1024)).toFixed(2);
  return `${storageUsageInMB} MB`;
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch analytics data from the backend API
        const response = await axios.get("http://localhost:5000/analytics");
        setAnalytics(response.data.data);
      } catch (error) {
        console.error("Analytics fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="analytics-container">
        <h2 className="analytics-heading">Analytics</h2>
        {analytics && (
          <div className="analytics-content">
            <div className="analytics-chart">
              <h3 className="chart-heading">File Types:</h3>
              {analytics.fileType ? (
                <ul className="chart-list">
                  {Object.entries(analytics.fileType).map(
                    ([type, count], index) => (
                      <li
                        key={type}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {`${type}: ${count}`}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>No file types found.</p>
              )}
            </div>

            <div className="analytics-details">
              <div className="analytics-item">
                <h3>Total File Size:</h3>
                <p>{formatFileSize(analytics.fileSize)}</p>
              </div>
              <div className="analytics-item">
                <h3>Storage Usage:</h3>
                <p>{formatStorageUsage(analytics.storageUsage)}</p>
              </div>
              <div className="analytics-item">
                <h3>File Links:</h3>
                {analytics.fileLinks ? (
                  <ul className="link-list">
                    {analytics.fileLinks.map((link, index) => (
                      <li
                        key={index}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <a href={link}>{link}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No file links found.</p>
                )}
              </div>
              <div className="analytics-item">
                <h3>Risk Counter:</h3>
                <p>{analytics.riskCounter}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
