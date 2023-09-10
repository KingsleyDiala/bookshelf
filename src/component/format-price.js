const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  export default FormatPrice;
  