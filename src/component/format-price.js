const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USA",
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  export default FormatPrice;
  