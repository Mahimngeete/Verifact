import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/history/${user}`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="history-page">
      <h2>Your Analysis History</h2>

      <div className="history-grid">
        {data.map((item, index) => {
          const imageUrl = `http://localhost:5000/${item.image}`;

          return (
            <div className="history-card" key={index}>
              <img src={imageUrl} alt="history" />

              <h3>{item.prediction}</h3>

              <p>
                Confidence: {(item.confidence * 100).toFixed(2)}%
              </p>

              <p className="time">{item.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;