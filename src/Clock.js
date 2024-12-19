// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// // Styled Components for the Clock
// const ClockContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f0f0;
// `;

// const ClockFace = styled.div`
//   position: relative;
//   width: 400px;
//   height: 400px;
//   border: 10px solid #333;
//   border-radius: 50%;
//   background: white;
// `;

// const Numeral = styled.div`
//   position: absolute;
//   color: #333;
//   font-family: "Times New Roman", Times, serif;
//   font-size: 1.5rem;
//   transform: translate(-50%, -50%);
// `;

// const ClockHand = styled.div`
//   position: absolute;
//   bottom: 50%;
//   left: 50%;
//   transform-origin: bottom;
//   background: #333;
//   transform: translate(-50%, 0) rotate(${(props) => props.rotation}deg);
//   border-radius: 5px;
// `;

// const SecondHand = styled(ClockHand)`
//   width: 2px;
//   height: 45%;
//   background: red;
// `;

// const MinuteHand = styled(ClockHand)`
//   width: 4px;
//   height: 40%;
// `;

// const HourHand = styled(ClockHand)`
//   width: 6px;
//   height: 30%;
// `;

// // Clock Component
// const Clock = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const numerals = [
//     { numeral: "XII", angle: 0 },
//     { numeral: "I", angle: 30 },
//     { numeral: "II", angle: 60 },
//     { numeral: "III", angle: 90 },
//     { numeral: "IV", angle: 120 },
//     { numeral: "V", angle: 150 },
//     { numeral: "VI", angle: 180 },
//     { numeral: "VII", angle: 210 },
//     { numeral: "VIII", angle: 240 },
//     { numeral: "IX", angle: 270 },
//     { numeral: "X", angle: 300 },
//     { numeral: "XI", angle: 330 },
//   ];

//   const secondRotation = time.getSeconds() * 6;
//   const minuteRotation = time.getMinutes() * 6 + time.getSeconds() / 10;
//   const hourRotation =
//     (time.getHours() % 12) * 30 + time.getMinutes() / 2 + time.getSeconds() / 120;

//   return (
//     <ClockContainer>
//       <ClockFace>
//         {numerals.map((num, index) => (
//           <Numeral
//             key={index}
//             style={{
//               top: `${50 - 40 * Math.cos((Math.PI / 180) * num.angle)}%`,
//               left: `${50 + 40 * Math.sin((Math.PI / 180) * num.angle)}%`,
//             }}
//           >
//             {num.numeral}
//           </Numeral>
//         ))}
//         <HourHand rotation={hourRotation} />
//         <MinuteHand rotation={minuteRotation} />
//         <SecondHand rotation={secondRotation} />
//       </ClockFace>
//     </ClockContainer>
//   );
// };

// export default Clock;
import React from "react";
import styled from "styled-components";

const Clock = ({ time }) => {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <ClockContainer>
      <TimeDisplay>
        {hours}:{minutes}:{seconds}
      </TimeDisplay>
    </ClockContainer>
  );
};

const ClockContainer = styled.div`
  margin: 20px auto;
  border: 5px solid black;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeDisplay = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

export default Clock;
