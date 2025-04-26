// src/utils/value_converter.js

const value_converter = (number) => {
    if (!number) return '0';
    const num = parseInt(number, 10);
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M views';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K views';
    return num + ' views';
  };
  
  export default value_converter;
  