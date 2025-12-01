import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { LightbulbOutlined as LightbulbIcon } from "@mui/icons-material";
import dashboardService from "../../services/dashboardService";

const SuggestionCard = () => {
  const [suggestion, setSuggestion] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const data = await dashboardService.getSuggestion();
        console.log("Suggestion data:", data);
        setSuggestion(data.suggestion);
      } catch (err) {
        setError("Could not load suggestion.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={100}
      >
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Generating AI suggestion...
        </Typography>
      </Box>
    );
  }

  if (error || !suggestion) {
    return null; // Don't render the card if there's an error or no suggestion
  }

  return (
    <Card
      sx={{
        mt: 4,
        backgroundColor: "primary.light",
        color: "primary.contrastText",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <LightbulbIcon sx={{ mr: 1 }} />
          {suggestion.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {suggestion.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
