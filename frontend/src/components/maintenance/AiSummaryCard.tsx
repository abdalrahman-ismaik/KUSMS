import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { getAiSummary } from "../../services/maintenanceService";

const AiSummaryCard: React.FC = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAiSummary();
      // The backend now returns an object { aiSummary: "..." }
      // The data itself is that object, so we access its property
      setSummary(data.aiSummary);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load AI summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  console.log("AI Summary:", summary);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly Maintenance AI Summary
        </Typography>
        {loading ? (
          <Typography variant="body2" color="text.secondary">
            Waiting for AI response...
          </Typography>
        ) : error ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={fetchSummary}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {summary || "No summary available."}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSummaryCard;
