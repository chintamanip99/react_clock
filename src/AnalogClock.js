import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ClockFace = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 12px solid #007bff;
  border-radius: 50%;
  background: white;
`;

const Numeral = styled.div`
  position: absolute;
  color: #333;
  font-family: "Times New Roman", Times, serif;
  font-size: 1.8rem;
  font-weight: bold;
  transform: translate(-50%, -50%);
`;

const MinuteMarker = styled.div`
  position: absolute;
  background: #666;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg);
  transform-origin: center;
  width: ${(props) => (props.isMajor ? "6px" : "3px")};
  height: ${(props) => (props.isMajor ? "15px" : "8px")};
`;

const ClockHand = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: translate(-50%, 0) rotate(${(props) => props.rotation}deg);
  border-radius: 5px;
`;

const SecondHand = styled(ClockHand)`
  width: 2px;
  height: 45%;
  background: red;
`;

const MinuteHand = styled(ClockHand)`
  width: 4px;
  height: 40%;
  background: #666;
`;

const HourHand = styled(ClockHand)`
  width: 6px;
  height: 30%;
  background: #333;
`;


const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const numerals = [
    { numeral: "XII", angle: 0 },
    { numeral: "I", angle: 30 },
    { numeral: "II", angle: 60 },
    { numeral: "III", angle: 90 },
    { numeral: "IV", angle: 120 },
    { numeral: "V", angle: 150 },
    { numeral: "VI", angle: 180 },
    { numeral: "VII", angle: 210 },
    { numeral: "VIII", angle: 240 },
    { numeral: "IX", angle: 270 },
    { numeral: "X", angle: 300 },
    { numeral: "XI", angle: 330 },
  ];

  const secondRotation = time.getSeconds() * 6;
  const minuteRotation = time.getMinutes() * 6 + time.getSeconds() / 10;
  const hourRotation =
    (time.getHours() % 12) * 30 + time.getMinutes() / 2 + time.getSeconds() / 120;

  return (
    <ClockContainer>
      <ClockFace>
        {/* Hour Numerals */}
        {numerals.map((num, index) => (
          <Numeral
            key={index}
            style={{
              top: `${50 - 40 * Math.cos((Math.PI / 180) * num.angle)}%`,
              left: `${50 + 40 * Math.sin((Math.PI / 180) * num.angle)}%`,
            }}
          >
            {num.numeral}
          </Numeral>
        ))}

        {/* Minute Markers */}
        {Array.from({ length: 60 }).map((_, index) => {
          const isMajor = index % 5 === 0;
          return (
            <MinuteMarker
              key={index}
              isMajor={isMajor}
              angle={index * 6}
              style={{
                top: `${50 - 48 * Math.cos((Math.PI / 180) * index * 6)}%`,
                left: `${50 + 48 * Math.sin((Math.PI / 180) * index * 6)}%`,
              }}
            />
          );
        })}

        {/* Clock Hands */}
        <HourHand rotation={hourRotation} />
        <MinuteHand rotation={minuteRotation} />
        <SecondHand rotation={secondRotation} />
      </ClockFace>
    </ClockContainer>
  );
};

export default Clock;
