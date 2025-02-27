export const dogCard = {
    maxWidth: { xs: "100%", sm: 345 }, // Full width on mobile, fixed width on larger screens
    boxShadow: 3,
    borderRadius: 3,
    overflow: "hidden",
    transition: "0.3s",
    "&:hover": { boxShadow: 6 },
  };
  
  export const dogImage = {
    objectFit: "cover",
    width: "100%",
    height: { xs: "180px", sm: "200px", md: "220px" }, // Dynamic height scaling
  };
  
  export const dogName = {
    fontWeight: "bold",
    color: "#333",
    fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Bigger text on larger screens
  };
  