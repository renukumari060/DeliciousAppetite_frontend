import { TextField } from "@mui/material";
import { Container } from "react-bootstrap";

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
        <h2>What do you want to try?</h2>

        <TextField
          style={{ width: "100%", borderRadius: 30 }}
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
