import React from "react";

const SummaryCard = ({ summary }) => {
  if (summary === null ) return null;
  const lines = summary.split("\n");

  return (
    <div style={styles.card}>
      <h2 style={styles.header}>To-Do Summary </h2>

      <hr style={styles.divider} />

      <div>
        {lines.map((line, index) => (
          <p key={index} style={styles.line}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

// Inline styles (you can move to CSS if preferred)
const styles = {
  card: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1.5rem",
  },
  header: {
    marginBottom: "1rem",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #ddd",
    marginBottom: "1.5rem",
  },
  line: {
    margin: "0.5rem 0",
  },
  context: {
    marginTop: "2rem",
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default SummaryCard;
