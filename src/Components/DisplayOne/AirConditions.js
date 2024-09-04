import React from 'react';
import { GetCurrentData } from '../../Helper';
import useMouseHoverEffect from '../../useMouseHoverEffect';

export default function AirConditions({ index, setActiveSection, arr }) {
  const containerRef = useMouseHoverEffect();

  const airConditionsData = [
    { icon: "/images/humidity.svg", label: "Humidity", value: `${GetCurrentData(arr, 'humidity')}%` },
    { icon: "../../../images/sun.svg", label: "UV", value: GetCurrentData(arr, 'uvIndex') },
    { icon: "../../../images/visibility.png", label: "Visibility", value: GetCurrentData(arr, 'visibility') },
    { icon: "../../../images/wind.png", label: "Wind", value: `${GetCurrentData(arr, 'windspeedKmph')} km/h` }
  ];

  if (!arr || !arr['data'] || !arr['data'].current_condition) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className='container drag'
      ref={containerRef}
      style={{ width: '100%' }}
      draggable
      onDragStart={() => setActiveSection(index)}
      onDragEnd={() => setActiveSection(null)}
    >
      <label className='container-label'>AIR CONDITIONS</label>
      <div className="conditions-container">
        {airConditionsData.map((condition, idx) => (
          <label key={idx} className='air-condition'>
            <div className='condition-description'>
              <img src={condition.icon} alt={condition.label.toLowerCase()} />
              {condition.label}
            </div>
            <span className='air-condition-value'>{condition.value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
