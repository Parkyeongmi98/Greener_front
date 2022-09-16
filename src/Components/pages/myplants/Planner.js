import React, { useState } from 'react';
import MyplantsTab from './MyPlantsTab';
import Calendar from 'react-calendar';
import "../css/Planner.css";

function Planner() {

  const [value, onChange] = useState(new Date());


  return (
    <div>
        <MyplantsTab />
        
        <Calendar
        onChange={onChange}
        value={value}
      />




    </div>
  );
}

export default Planner;


// import React, { useState, useEffect } from 'react';
// import MyplantsTab from './MyPlantsTab';
// import Calendar from 'react-calendar';
// import axios from 'axios';
// import "../css/Planner.css";

// function Planner() {

//   const [value, onChange] = useState(new Date());
//   const [mark, setMark] = useState([])

//   useEffect(() => {

//     const getmark = async () => {
//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       const data = await axios.get("/api/v1/my-plants")
//       console.log(data.data.bornDate)
//       return data.bornDate
//     }
//     getmark().then(result => setMark(result));
// }, [])


//   return (
//     <div>
//         <MyplantsTab />
        
//         {/* <Calendar
//           onChange={onChange}
//           formatDay={(locale, date) => moment(date).format("DD")}
//           value={value}
//           className="mx-auto w-full text-sm border-b"
//           tileContent={({ date, view }) => {
//             if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
//               return (
//               <>
//                 <div className="flex justify-center items-center absoluteDiv">
//                   <div className="dot"></div>
//                 </div>
//               </>
//             );
//             }
//           }}
//       /> */}




//     </div>
//   );
// }

// export default Planner;