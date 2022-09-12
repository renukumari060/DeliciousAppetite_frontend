export default function SearchBar(props) {
  return (
    <div>
      <div>
        <h2>What do you want to try?</h2>

        <input
          value={props.input}
          onChange={(event) => props.setInput(event.target.value)}
          type="text"
          placeholder="search recipe"
        ></input>
      </div>
    </div>
  );
}
