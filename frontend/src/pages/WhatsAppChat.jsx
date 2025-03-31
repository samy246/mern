import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box } from "@mui/material";

const WhatsAppChat = ({ phoneNumber = "1234567890", message = "Hello! I need some help." }) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Box
            component="a"
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                position: "fixed",
                bottom: 90,
                right: 20,
                backgroundColor: "#0aad0a",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                zIndex:"999",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }}
        >
            <WhatsAppIcon sx={{ color: "white", fontSize: 36 }} />
        </Box>
    );
};

export default WhatsAppChat;
