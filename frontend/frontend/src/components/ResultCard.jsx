// function ResultCard({data}){

// return(

// <div className="result">

// <h3>
// Result: {data.prediction}
// </h3>

// <p>
// Confidence: {(data.confidence * 100).toFixed(2)}%
// </p>

// <div className="bar">

// <div
// className="progress"
// style={{
// width:`${data.confidence*100}%`
// }}
// ></div>

// </div>

// </div>

// )

// }

// export default ResultCard
//adding the preview option
function ResultCard({ data }) {
  return (
    <div className="result">

      <h3>
        Result: {data.prediction}
      </h3>

      <p>
        Confidence: {(data.confidence * 100).toFixed(2)}%
      </p>

      <div className="bar">
        <div
          className="progress"
          style={{
            width: `${data.confidence * 100}%`
          }}
        ></div>
      </div>

    </div>
  );
}

export default ResultCard;