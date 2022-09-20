import { TextField, Typography, Container } from "@mui/material";

export default function SearchBar(props) {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
          marginBottom: 20,
          gap: 8,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: "700",
            color: "orange",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          variant="h3"
        >
          What do you want to try?
        </Typography>

        <TextField
          style={{ width: "80%", borderRadius: 30, color: "white" }}
          id="outlined-basic"
          variant="outlined"
          value={props.input}
          onChange={(event) => props.setInput(event.target.value)}
          type="text"
          placeholder="search recipe"
          allowClear
        />
      </div>
    </Container>
  );
}
