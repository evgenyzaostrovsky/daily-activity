import Box from "@mui/material/Box";

export const IncentiveCalculator = () => {
    return (
        <Box sx={{display: "flex",

                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                alignSelf: "center",
                maxWidth: "1140px",
                height: "600px",
                width: "100%",
                mt: "20px",
                padding: "10px"}}>
        <div style={{

                width: "100%",
                height: "600px",
                backgroundColor: "white",

            }}>
                <Box
                    sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(/incoming.jpg)`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                    }}
                >

                </Box>
        </div>
        </Box>
    );
};

